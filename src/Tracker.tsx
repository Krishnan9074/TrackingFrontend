import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import PropTypes from "prop-types";

export const SlotText = ({
  className,
  textClassName,
  text = "This is a content field"
}) => {
  return (
    <div
      className={`flex flex-col w-[178px] items-start relative ${className}`}
    >
      <p
        className={`relative self-stretch mt-[-1.00px] [font-family:var(--en-desktop-body-m-font-family)] font-[number:var(--en-desktop-body-m-font-weight)] text-[color:var(--lightprimarygrey-80)] text-[length:var(--en-desktop-body-m-font-size)] tracking-[var(--en-desktop-body-m-letter-spacing)] leading-[var(--en-desktop-body-m-line-height)]  ${textClassName}`}
      >
        {text}
      </p>
    </div>
  );
};

SlotText.propTypes = {
  text: PropTypes.string
};

export const Frame = ({ ServiceId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/858a84c2-797b-49c8-9d08-0f419dfe41c2")
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) {
    return "Loading...";
  }

  return (
    <div className="frame">
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <SlotText
              className="slot-text-instance"
              text="Date of booking"
              textClassName="design-component-instance-node"
            />
            <div>{data.data.createdDate}</div>
          </div>
          <div className="div-3">
            <SlotText
              className="slot-text-instance"
              text="Service category"
              textClassName="design-component-instance-node"
            />
            <div>{data.data.categoryName}</div>
          </div>
        </div>
        <div className="div-2">
          <div className="div-3">
            <SlotText
              className="slot-text-instance"
              text="Date of service"
              textClassName="design-component-instance-node"
            />
            <div>{data.data.serviceDate}</div>
          </div>
          <div className="div-3">
            <SlotText
              className="slot-text-instance"
              text="Preferred Time Slot"
              textClassName="design-component-instance-node"
            />
            <div className="dynamicContents">{data.prefTimeSlot}</div>
          </div>
        </div>
        <div className="frame-wrapper">
          <div className="div-4">
            <SlotText
              className="slot-text-instance"
              text="Service ID"
              textClassName="design-component-instance-node"
            />
            <div>{data.data.serviceId}</div>
          </div>
        </div>
      </div>

      <div className="ETA">
        <SlotText
          className="slot-text-instance"
          text="Estimated Date and Time of Resolution:"
          textClassName="design-component-instance-node"
        />
        <div className="frame-timeofdel">
          <div className="timeofdel">
            {/* {data.data.trackOrder.statusList.subStatus.time} */}
            26 September 2023
          </div>
        </div>
      </div>
    </div>
  );
};
