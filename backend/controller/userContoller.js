const User = require('../modal/userSchema');

exports.home = (req, res) => {
    res.send("Welcome")
}

exports.saveUser = async (req, res) => {

    const file = req.file.filename;
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone || !file) {
        return res.status(400).json({ message: "Please fill all fields" })
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
        return res.status(400).json({ message: "User already exists" })
    }

    try {
        const payload = {
            name,
            email,
            password,
            phone,
            photo: file
        }
        const user = new User(payload);
        const userData = await user.save();
        res.status(201).json({
            message: "User created successfully",
            data: userData
        })
    } catch (error) {
        console.log(error)
    }

    return;
    //wihout file upload
    const payload = req.body;
    try {
        const user = new User(payload);
        const userData = await user.save();
        res.json(userData)
    } catch (error) {
        console.log(error)
    }

}

exports.getAllUsers = async (req, res) => {
    try {
        const userr = await User.find({});
        res.status(200).json(userr)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById({ _id: id });
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

exports.getUpdateUser = async (req, res) => {
    console.log(req.body)
    const id = req.params.id;
    const {name, email, password, photo, phone} = req.body;
    const file = req.file ? req.file.filename : photo;

    try {
       const user = await User.findByIdAndUpdate({_id : id},{name, email, password, phone, photo:file}, {new : true});
       res.status(202).json(user);    
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
    return;
    try {
        const id = req.params.id;
        const payload = req.body;
        const user = await User.findByIdAndUpdate({ _id: id }, payload, { new: true })
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

exports.getDeleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({ _id: id });
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}
