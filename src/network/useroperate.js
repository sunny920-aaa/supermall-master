import { user } from "./user";
import qs from "qs";

export function postRegisterUser(userInfo) {
    if (userInfo.data != null && Object.keys(userInfo.data).length != 0) {
        userInfo.data = qs.stringify(userInfo.data);
    }

    return user({
        url: "/regist",
        method: "post",
        data: {
            username: userInfo.username,
            password: userInfo.password
        }
    });

}
export function postLoginUser(userInfo) {
    console.log(userInfo);
    if (userInfo.data != null && Object.keys(userInfo.data).length != 0) {
        userInfo.data = qs.stringify(userInfo.data);
    }
    return user({
        url: "/login",
        method: "post",
        data: {
            username: userInfo.username,
            password: userInfo.password
        }
    });

}