export interface SuggestKeywords {
    categories: string[];
    terms: string[];
}

export interface Coordinate{
    latitude: string;
    longitude: string;
}

export interface IpResponse{
    loc:string;
}

export interface GeoResponse{
    results:{
        geometry:{
            location:{
                lat:number,
                lng:number,
            }
        }

    }[];
}

export interface SearchResults{
    businesses:{
        image_url: string,
        id: string
        rating: number
        name:string,
        distance:number
    }[]
}


export interface BusinessDetail{

    id:string,
    name:string,
    url:string,
    display_phone:string,
    photos: string[],
    price: string,
    categories:{
        title:string
    }[]
    coordinates: {
        latitude:number,
        longitude: number
    }
    location: {
        display_address:string[]
    }

    hours:{
        is_open_now:boolean
    }[]
}



export interface BusinessReview{

    reviews:
        {
            text:string;
            time_created: string

            rating: number;
            user:{
                name:string;
            }
        }[]
    
}

export interface Reservation{

    name: string;
    date: string;
    time: string;
    email: string;
    id: string;



}






