export class Terminal{
    constructor(
       public terminalId:number,
       public  terminalName:string,
        public country:string,
        public itemType:string,
        public terminalDescription:string,
        public capacity:number,
        public status:string,
        public harbourLocation:string,
        public availableCapacity:number
    ){}
}