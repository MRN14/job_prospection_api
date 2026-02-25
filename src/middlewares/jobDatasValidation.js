export const verifyJobDatas = (req, res, next) => {
    // Get job datas
    let { job, companyName, place, status, source, contact, dispatchDate, note, opinion } = req.body;
    let validFields = ["job", "companyName", "place", "status", "source", "contact", "dispatchDate", "note", "opinion"];

    for (const field in req.body) {
        if (!validFields.includes(field)) {
            return res.status(400).json({ "message": `${field} is not a valid field` });
        }
    }

    if (!job) {
        return res.status(400).json({ "message": "job is required" });
    }

    // Verify status
    const statusEnum = ['application sent', 'first interview', 'refused', 'no response'];
    if (status && !statusEnum.includes(status.trim())) {
        return res.status(400).json({ "message": "incorrect status" });
    }

    // Verify opinion
    if (opinion) {
        if (!Number.isSafeInteger(opinion) || opinion === "" || opinion == null) {
            return res.status(400).json({ "message": "opinion is not a valid integer" });
        }
        if (opinion < 0 || opinion > 5) {
            return res.status(400).json({ "message": "opinion must be between 0 and 5" });
        }
    }


    // Verify source
    const urlPattern = /^(https?:\/\/)?(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b).*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*$/gm

    if (source && !source.match(urlPattern)) {
        return res.status(400).json({ "message": "invalid source url" });
    }

    // Verify date
    const datePattern = /^20\d{2}-[0,1]\d-[0-3]\d$/gm;

    if (dispatchDate && !dispatchDate.match(datePattern)) {
        return res.status(400).json({ "message": "date must be in format YYYY-MM-DD" });
    }

    //Verify contact
    const phonePatten = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    const emailPattern = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

    if (contact && !contact.match(phonePatten) && !contact.match(emailPattern)) {
        return res.status(400).json({ "message": "contact must be a valid phone or email" });
    }

    next();
}