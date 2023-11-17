require("dotenv").config();

const serverIP = process.env.SERVER_IP_ADDRESS;
const tempAPIs = new Map(); // 임시 API 관리를 위한 맵

const generateLink = async (req, res) => {
  try{
    console.log("/link")

    var tempPath;

    switch(req.body.type){
      case 'random':
        tempPath = Math.random().toString(36).substring(2, 15);
      case 'did':
        tempPath = req.body.did.address
    }

    const payload = req.body.payload;
    tempAPIs.set(tempPath, { payload });

    req.app.get(`/temp/${tempPath}`, (req, res) => {
      console.log("/temp")
      if (tempAPIs.has(tempPath)) {
        const data = tempAPIs.get(tempPath);
        tempAPIs.delete(tempPath); // 첫 요청 후 API 삭제
        res.json(data);
      } else {
        res.status(404).send('Not found or already used');
      }
    });

    return res.json({ link: `https://${serverIP}:5003/temp/${tempPath}` });
  }catch(error){
    console.log("requestLink function error: ", error)
    return res.status(400).send(error);
  }
}

module.exports={
  generateLink
}