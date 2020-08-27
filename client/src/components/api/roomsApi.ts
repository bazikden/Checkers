import axios, { AxiosResponse } from "axios"

const api = axios.create({
    baseURL: "/api/rooms"
})

class RoomsApi {
    static async getRooms() {
        try {
            const response: AxiosResponse = await api.get('/')
            return response.data.rooms
        } catch (error) {
            console.log(error.data)
            return error.data
        }
    }

    static async addRoom(count:number,player:string,roomId:string | undefined = undefined) {
        try {
            const data = {name:`Room${count + 1}`,player,roomId}
            const response: AxiosResponse = await api.post('/',data)
            return response.data.room
        } catch (error) {
            console.log(error.data)
            return error.data
        }
    }

    static async getRoom(roomId:string ) {
        try {
            const response: AxiosResponse = await api.get(`/${roomId}`)
            return response.data.room
        } catch (error) {
            console.log(error.data)
            return error.data
        }
    }

    static async refreshRooms(name:string){
        try {
            const data = {name}
            const response: AxiosResponse = await api.put(`/`,data)
            return response.data.room
        } catch (error) {
            console.log(error.data)
            return error.data
        }
    }
}
export { RoomsApi }