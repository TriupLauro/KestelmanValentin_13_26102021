import {rest} from "msw";

const BASE_URL = 'http://localhost:3001/api/v1'

export const handlers = [
    rest.post(`${BASE_URL}/user/login`,(req,res,ctx) => {
        const {email, password} = req.body

        if (email === 'test@name.com' && password === 'testpassword') {
            return res(
                ctx.status(200),
                ctx.json({body : {
                        token :'SECRET_TOKEN'
                    }})
            )
        }

        return res(
            ctx.status(403),
            ctx.json({
                message : 'Test error message : unauthorized access'
            })
        )
    }),
    rest.post(`${BASE_URL}/user/profile`,(req,res,ctx) => {
        const mockedToken = req.headers.get('authorization').split('Bearer')[1].trim()

        if (mockedToken === 'SECRET_TOKEN') {
            return res(
                ctx.json({
                    body : {
                        firstName : 'testFirstName',
                        lastName : 'testLastName',
                        email : 'test@name.com',
                        id : 'TEST_ID'
                    }
                })
            )
        }

        return res(
            ctx.status(403),
            ctx.json({
                message : 'Test error message : invalid token'
            })
        )
    })
]