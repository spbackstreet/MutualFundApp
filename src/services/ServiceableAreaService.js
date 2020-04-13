

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { basicAuth } from '../commom/basicAuth';


const ServiceableAreaService = async (pin) => {

    const Request = {

        "guid": config.guid,
        "callName": "getserviceableareasbypin",
        "leadSource": "2",
        "leadType": "22",
        "pin": pin,//for test
        // "pin": "400053",
        "businessLine": "1",
        "dateTime": "1477479050396"
    };
    console.log("Request : ", Request)
    const APIURL = `${process.env.REACT_APP_API_URL}/MobilityPlan/GetServiceableAreaBypin`;
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}



export default ServiceableAreaService;