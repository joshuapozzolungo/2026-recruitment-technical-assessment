import React, { useState } from "react";
import OpenLogo from "../../assets/freeRoomsLogo.png";
import CloseLogo from "../../assets/freeroomsDoorClosed.png";
import SearchIcon from '@mui/icons-material/Search';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import MapIcon from '@mui/icons-material/Map';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Header() {

  const [isDoorOpen, setIsDoorOpen] = useState(true);
  const toggleDoor = () => {
    setIsDoorOpen(!isDoorOpen);
  }

  return (
    <header className="flex items-center justify-between w-full h-16 border-b border-black/10 py-2 px-3">
      <a className="flex items-center content-center transition duration-300 hover:opacity-60 cursor-pointer" onClick={toggleDoor}>
        <div className="flex items-center">  
          <img src={isDoorOpen ? OpenLogo : CloseLogo} className="w-[50px] h-[50px]" alt="Freerooms Logo"/>
          <p className="text-4xl font-primary text-primary leading-none self-center pt-2">Freerooms</p>
        </div>
      </a>
      <div className="flex space-x-2">
        <button className="icons">
          <SearchIcon></SearchIcon>
        </button>
        <a className="icons">
          <GridViewRoundedIcon></GridViewRoundedIcon>
        </a>
        <a className="icons">
          <MeetingRoomRoundedIcon></MeetingRoomRoundedIcon>
        </a>
        <a className="icons">
          <MapIcon></MapIcon>
        </a>
        <button className="icons">
          <DarkModeIcon></DarkModeIcon>
        </button>
      </div>
    </header>
  );
}
