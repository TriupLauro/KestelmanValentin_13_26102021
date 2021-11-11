import {rest} from "msw";

export const handlers = [
    rest.post('http://localhost:3001/api/v1/user/login',(req,res,ctx) => {

        return res(
            ctx.status(200)
        )
    })
]