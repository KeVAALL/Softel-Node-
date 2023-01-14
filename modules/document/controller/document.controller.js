// Model for document is pending

export const documentUpload =  (req, res) => {

    if(!req.files || Object.keys(req.files).length == 0) {
        let data = {
            message: "No file(s) found to upload!!"
        };
        res.status(500).json(data);
    }

    //Upload file 
    let uploadPath = __dirname + "/public/upload/";
    const fileObject = req.files.sampleFile;

    fileObject.mv(uploadPath, (err) => {

        if(err) {
            res.json(500).json({
                status: false,
                message: `Err : ${err}`
            });
            return;
        }

        res.json(200).json({
            status:true,
            message:`File Upload`,
        });

    });
}