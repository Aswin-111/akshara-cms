require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const Gallery = require("./models/gallery");
const Devices = require("./models/devices");
const Contents = require("./models/contents");
const sequelize = require("./models");

app.use(cors());

app.use(express.json());
app.get('/api/test',(req,res)=>{return res.json({status : "done"})})
app.post("/api/addgallery", async (req, res) => {
  const { gallery } = req.body;

  try {
    const results = await Gallery.findOne({ where: { gallery } });
    console.log(results);
    if (!results) {
      const results = await Gallery.create({ gallery });
      console.log("done");
    } else {
      return res.json({
        status: "failed",
        data: "Gallery name found",
      });
    }
  } catch (err) {
    console.log(err);
  }
  return res.json({
    status: "success",
    data: "Gallery created successfully!..",
  });
});
app.get("/api/gallerydetails", async (req, res) => {
  try {
    const id = req.query.id;
    // console.log(req)
    const devices = await Devices.findAll({ where: { link: id } });
    return res.json({
      status: "success",
      data: devices,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      data: "Something went wrong",
      error: err,
      // req:{...req}
    });
  }
});
app.post("/api/showdevicesofgallery", async (req, res) => {
  try {
    const { galleryid } = req.body;
    // console.log(req)
    const devices = await Devices.findAll({
      where: { assigned_id: galleryid },
    });

    if (devices) {
      return res.json({
        status: "success",
        data: devices,
      });
    } else {
      return res.json({
        status: "failed",
        data: "Devices not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      data: "Something went wrong",
      error: err,
      // req:{...req}
    });
  }
});
app.post("/api/deletedevicefromgallery", async (req, res) => {
  try {
    const { device } = req.body;
    // console.log(req)
    const devices = await Devices.findOne({ where: { id: device } });
    console.log(device);

    if (devices) {
      console.log("the device id", devices.assigned, device);
      devices.assigned = false;
      devices.assigned_id = 0;
      (devices.topics = ""), await devices.save();
      return res.json({
        status: "success",
        data: devices,
      });
    } else {
      return res.json({
        status: "failed",
        data: "Devices not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      data: "Something went wrong",
      error: err,
      // req:{...req}
    });
  }
});

app.post("/api/deletegallery", async (req, res) => {
  try {
    const { gallery } = req.body;

    // console.log("the device id",devices.assigned,device);

    await Devices.update(
      { assigned: false, assigned_id: 0 }, // Fields to update
      { where: { assigned_id: gallery } } // Conditions for the update
    );

    // Optionally, save the updated devices back to the database

    // await Gallery.destroy

    await Gallery.destroy({ where: { id: gallery } });

    return res.json({
      status: "success",
      data: "The gallery deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      data: "Something went wrong",
      error: err,
      // req:{...req}
    });
  }
});
app.post("/api/deletedevice", async (req, res) => {
  try {
    const { device } = req.body;
    console.log(device)
    await Devices.destroy({ where: { id: device } });

    return res.json({
      status: "success",
      data: "The gallery deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      data: "Something went wrong",
      error: err,
      // req:{...req}
    });
  }
});
app.get("/api/showdevices", async (req, res) => {
  try {
    console.log("ip : ",req.ip)
    console.log(req.headers['x-forwarded-for'] || req.socket.remoteAddress)
    const galleries = await Devices.findAll();
    return res.json({
      status: "success",
      data: galleries,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      data: "Something went wrong",
      error: err,
    });
  }
});

app.get("/api/checkavailability", async (req, res) => {
  try {
    const gallery_devices = await Devices.findAll({
      where: { assigned: false },
    });
    return res.json({
      status: "success",
      data: gallery_devices,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      data: "Something went wrong",
      error: err,
    });
  }
});
app.get("/api/showgallery", async (req, res) => {
  try {
    const galleries = await Gallery.findAll();
    return res.json({
      status: "success",
      data: galleries,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      data: "Something went wrong",
      error: err,
    });
  }
});

app.post("/api/adddevices", async (req, res) => {
  const { device, ip } = req.body;

  try {
    const dev = await Devices.findOne({ where: { device } });

    const result = await Devices.findOne({ where: { ip } });
    if (!result && !dev) {
      const results = await Devices.create({ device, ip });
      console.log("done");
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      data: "something went wrong",
    });
  }
  return res.json({
    status: "success",
    data: "Device created successfully!..",
  });
});

app.post("/api/adddevicetogallery", async (req, res) => {
  const { gallery, device } = req.body;
  console.log(gallery, device);
  try {
    const devicefetch = await Devices.findOne({ where: { id: device } });

    // const result = await Devices.findOne({where : {ip} })
    if (devicefetch) {
      devicefetch.assigned = true;
      devicefetch.assigned_id = String(gallery);
      await devicefetch.save();
      // const results = await Devices.create({ device,ip });

      console.log("done");
    } else {
      return res.json({
        status: "failed",
        data: "The device was not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      data: "something went wrong",
    });
  }
  return res.json({
    status: "success",
    data: "Device created successfully!..",
  });
});


app.post("/api/showtopics", async (req, res) => {
  const { id } = req.body;
  try {
    const devicefetch = await Contents.findAll({ where: { id } });

    // const result = await Devices.findOne({where : {ip} })
    if (devicefetch) {
      return res.json({
        status: "success",
        data: devicefetch,
      });
      // const results = await Devices.create({ device,ip })
    } else {
      return res.json({
        status: "failed",
        data: "The topic was not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failed",
      data: "something went wrong",
    });
  }
});

app.post('/api/add-content', async (req, res) => {
  const { id, newTopics } = req.body;
 
  console.log(id,newTopics)
  if (!id || !Array.isArray(newTopics) || newTopics.length === 0) {
      return res.status(400).json({ error: 'ID and an array of topics are required' });
  }

  try {
      // Find the device by id
      let device = await Devices.findOne({ where: { id } });

      if (!device) {
          // If the device does not exist, create a new device with the given id, topics
          device = await Devices.create({
              id,
              topics: newTopics
          });

          return res.status(201).json({ success: true, message: 'New device created and topics added', device });
      }

      // If the device exists, append new topics to the existing array without duplicates
      let existingTopics = device.topics ? device.topics : [];
      
      // Use a Set to merge and remove duplicates
      let updatedTopics = [...new Set([...existingTopics, ...newTopics])];

      // Update the device with the new topics array
      await device.update({ topics: updatedTopics });

      res.json({ success: true, message: 'Topics added successfully', topics: updatedTopics });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/get-topicsbyip', async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
      return res.status(400).json({ error: 'ip is required' });
  }

  try {
      // Find the device by id
      const device = await Devices.findOne({ where: { ip } });

      if (!device) {
          return res.status(404).json({ error: 'Device not found' });
      }

      // Respond with the topics
      res.json({ success: true, topics: device.topics });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/api/get-topics', async (req, res) => {
  const { id } = req.body;



  
  

  console.log("done",id)
  if (!id) {
      return res.status(400).json({ error: 'ID is required' });
  }

  try {
      // Find the device by id
      const device = await Devices.findOne({ where: { id } });

      if (!device) {
          return res.status(404).json({ error: 'Device not found' });
      }

      // Respond with the topics
      res.json({ success: true, topics: device.topics });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });

  }


})  


app.post('/get-topicsbyip', async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
      return res.status(400).json({ error: 'ip is required' });
  }

  try {
      // Find the device by id
      const device = await Devices.findOne({ where: { ip } });

      if (!device) {
          return res.status(404).json({ error: 'Device not found' });
      }

      // Respond with the topics
      res.json({ success: true, topics: device.topics });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
})

app.delete('/delete-topic', async (req, res) => {
  const { id, topic } = req.body;

  if (!id || !topic) {
      return res.status(400).json({ error: 'ID and topic are required' });
  }

  try {
      // Find the device by id
      const device = await Devices.findOne({ where: { id } });

      if (!device) {
          return res.status(404).json({ error: 'Device not found' });
      }

      // Check if the topic exists in the topics array
      let existingTopics = device.topics ? device.topics : [];

      if (!existingTopics.includes(topic)) {
          return res.status(400).json({ error: 'Topic not found in the device' });
      }

      // Filter out the topic to be removed
      const updatedTopics = existingTopics.filter(t => t !== topic);

      // Update the device's topics array
      await device.update({ topics: updatedTopics });

      res.json({ success: true, message: 'Topic deleted successfully', topics: updatedTopics });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/api/query", async function (req, res) {
  const { query } = req.body;
  try {
    const result = await sequelize.query(`${query}`);
    console.log(result);
    return res.json({ results: result });
  } catch (err) {
    return res.json({ err: err });
  }
});

app.listen(7000, function() {
  console.log('Listening to port: 6000 ');
});