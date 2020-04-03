import React, { useState } from 'react';
import { FixedHeader } from '../../commom/FixedHeader';
import Spinner from 'react-spinner-material';
import useLoader from '../../hooks/useLoader';
import getpincode from '../../services/getpincode';
import useGlobalState from '../../hooks/useGlobalState';
import { storeCustomerCircle } from '../../action';
import { confirmAlert } from 'react-confirm-alert';
import OtpDialogue from '../OtpDialogue/OtpDialogue';
import '../../css/style.css';


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const DeliveryAddress = () => {

    const [msdn, setMsdn] = useState('')
    const [loading, setLoading] = useState(false)
    const [pincode, setPincode] = useState('')
    const [triggerAction] = useLoader();
    const [pincodeRes, dispatch] = useGlobalState();
    const [cityLst, setCityLst] = useState([])
    const [districtLst, setDistrictLst] = useState([])
    const [customerName, setCustomerName] = useState('')
    const [landMark, setLandmark] = useState('')
    const [roadName, setRoadName] = useState('')
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');

    const updatePincode = async (e) => {
        setPincode(e.currentTarget.value.substring(0, 6))

        if (e.currentTarget.value.substring(0, 6).length === 6) {
            setLoading(true)
            const getCustomerCircle = await triggerAction(() => getpincode(e.currentTarget.value.substring(0, 6)));
            setLoading(false)
            if (getCustomerCircle.ErrorCode === "00" || getCustomerCircle.ErrorCode === "0") {
                dispatch(storeCustomerCircle(getCustomerCircle));
                let vcityLst = [];
                let vdistrictLst = [];
                for (let i = 0; i < getCustomerCircle.pincodelist.length; i++) {
                    const element = getCustomerCircle.pincodelist[i];
                    vcityLst.push(element.city);
                    vdistrictLst.push(element.district);
                }
                setCityLst([...vcityLst]);
                setDistrictLst([...vdistrictLst]);

            }
            else {
                confirmAlert({
                    title: "Error",
                    message: getCustomerCircle.ErrorMsg,
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => { return false; }
                        }
                    ]
                });
            }
        }

    }

    const updateCustomerName = (e) => {
        setCustomerName(e.target.value)
    }

    const updateLandMark = (e) => {
        setLandmark(e.target.value)
    }

    const updateRoadName = (e) => {
        setRoadName(e.target.value)
    }

    const updateArea = (e) => {
        setArea(e.target.value)
    }

    const updateCity = (e) => {
        setCity(e.target.value)
    }

    const updateDistrict = (e) => {
        setDistrict(e.target.value)
    }

    const updateState = (e) => {
        setState(e.target.value)
    }

    const validateFields = (e) => {
        debugger;
        if(customerName && roadName && area && city && district && state){
            confirmAlert({
                message: "Are you an outstation customer?",
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => { return false; }
                    },
                    {
                        label: 'No',
                        onClick: () => { return false; }
                    }
                ]
            });
        }

        else{
            confirmAlert({
                title: "Error",
                message: "Please enter all mandatory fields",
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false; }
                    }
                ]
            });
        }
    }


    return (
        <div class="my_app_container">
            <div class="rechargehome_wrapper">
                <div>
                    <div class="container">

                        <div class="">
                            <div class="row">
                                <div class="col">
                                    {FixedHeader()}
                                    <section class="card-view-sm mt-3">
                                        <div class="md-font f-16 pl-3 pb-2">Customer Delivery Details</div>
                                        <div class="card shadow-sm">
                                            <div class="card-body">
                                                <div className="spin">
                                                    <Spinner visible={loading}
                                                        spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                                                </div>
                                                <div class="row no-gutters">
                                                    <div class="col-12">
                                                        <form action="" class="">
                                                            <div class="login">


                                                                <div class="form-group">

                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>House No/Flat No/Building/Apartment<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="customerName" type="text" required="required" name="customerName" autocomplete="off" placeholder=" "
                                                                    value={customerName} onChange={(e) => updateCustomerName(e)}
                                                                        style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }}
                                                                    />
                                                                </div>




                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Landmark</label>
                                                                    <input id="landMark" type="text" required="required" name="landMark" autocomplete="off"
                                                                     style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        value = {landMark} onChange= {(e) => updateLandMark(e)}
                                                                    />
                                                                </div>


                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Street Address/Road Name <label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="roadName" type="text" required="required" name="roadName" autocomplete="off" 
                                                                    style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    value = {roadName} onChange = {(e) => updateRoadName(e)}
                                                                    />
                                                                </div>


                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Area/Sector/Locality<label style={{ color: "#FF0000" }}>*</label></label>

                                                                    <input id="area" type="text" required="required" name="area" autocomplete="off" 
                                                                    style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    value = {area} onChange = {(e) => updateArea(e)}
                                                                    />
                                                                </div>


                                                                <div class="form-group">

                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Pincode<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <input id="pinCode" type="number" required="required" name="pinCode" autocomplete="off" style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                        onChange={(e) => updatePincode(e, "custOtp")}
                                                                        pattern="^[1-9]\d*$"
                                                                        value={pincode}
                                                                    />

                                                                </div>


                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>Village/Town/City<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <select id="village" type="number" required="required" name="village" autocomplete="off" 
                                                                    style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    onChange = {(e) => updateCity(e)} value = {city}
                                                                    >
                                                                        <option></option>
                                                                        {cityLst.map((element) =>
                                                                            (<option>{element}</option>))}


                                                                    </select>
                                                                </div>

                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>District<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    <select id="district" type="number" required="required" name="district" autocomplete="off" 
                                                                    style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    onChange = {(e) => updateDistrict(e)} value = {district}
                                                                    >
                                                                        <option></option>
                                                                        {districtLst.map((element) =>
                                                                            (<option>{element}</option>))}

                                                                    </select>
                                                                </div>



                                                                <div class="form-group">
                                                                    <label style={{ color: "black", "fontWeight": "bolder", marginBottom: "0px" }}>State<label style={{ color: "#FF0000" }}>*</label></label>

                                                                    <input id="state" type="text" required="required" name="state" autocomplete="off" 
                                                                    style={{ width: "100%", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", "border-radius": "4px", "box-sizing": "border-box", border: "2px solid rgb(13, 149, 162)", "border-radius": "8px" }} placeholder=" "
                                                                    value ={state} onChange={(e) => updateState(e)}
                                                                    />
                                                                </div>


                                                            </div>
                                                        </form>

                                                        <div class="form-group text-center mt-5 mb-0">
                                                            <button type="button" class="btn jio-btn jio-btn-primary w-100 plan-btn"
                                                                onClick={(e) => validateFields(e)}
                                                            >Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default DeliveryAddress;