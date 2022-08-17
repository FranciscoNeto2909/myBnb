const {v4} = require("uuid")

const id = v4()

let database = {
    users:[
        {
            userName:"João",
            pass:"user12345"
        }
    ],
    houses:[
        {
            name:"green house",
            tenant:"user",
            price:2500,
            description:"A large house with several bedrooms, swimming pool and huge lawn"
        }
    ]
}

module.exports = {database}