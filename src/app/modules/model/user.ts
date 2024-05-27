export class User{
    constructor(
        public email:string,
        private _id:string,
        public firstName:string,
        public isArtist:boolean,
        private _token:string,
        private expiresIn:Date
        
    
    ){

    }

    get token(){
        //if expires in property not exist or expires in property  exist,but it is  less than current date and 
        // time the token is expired
        if(!this.expiresIn|| this.expiresIn < new Date()){
            return  null
        }
        return this._token
    }

    get id(){
        return this._id
    }

}