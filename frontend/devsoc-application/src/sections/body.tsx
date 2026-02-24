import React from "react"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import roomData from "./room-data.json";

export default function Body() {
  return (
    <div className="p-5 space-y-3">
      <div className="flex flex-wrap gap-4 md:flex-row w-full justify-between pb-5">
         <div className="order-1 md:order-2 flex w-[100%] md:w-[50%] h-[44px] border-solid border-1 rounded-md border-[#E0E0E0] hover:border-black px-3 space-x-2 has-focus:border-primary has-focus:border-2">
            <div className="flex items-center content-center">
              <SearchIcon className="text-black/70"></SearchIcon>
            </div>
            <input type="text" placeholder="Search for a building..." className=" w-full focus:outline-none"/>
          </div> 

        <div className="order-2 md:order-1 filter-icons gap-x-4">
          <FilterAltIcon className="text-primary"></FilterAltIcon>
          <p className="secondary-text">Filters</p>
        </div>


        <div className="order-3 md:order-3 filter-icons gap-x-4">
          <FilterListIcon className="text-primary"></FilterListIcon>
          <p className="secondary-text">Sort</p>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 space-y-5">
        {roomData.map((room) => (
          <div className="group relative h-[10vh] md:h-[35vh] hover:cursor-pointer rounded-xl">
            <img src={room.imageURL} className="absolute rounded-xl inset-0 w-full h-full object-cover z-0"/>

            <div className="absolute inset-0 bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex absolute top-0 right-0 bg-white rounded-2xl p-3 mt-3 mr-3 items-center space-x-2">
              <div className="flex">
                <span className="rounded-full h-2 w-2 bg-[#4caf50]"></span>
              </div>
              <p className="hidden md:block font-secondary text-[12px] font-bold">{room.roomsAvailable} rooms available</p> 
              <p className="md:hidden font-secondary text-[12px] font-bold">{room.roomsAvailable} / {room.roomsAvailable}</p> 
            </div>
            <div className="sm:bg-transparent md:bg-primary flex absolute justify-self-center justify-between bottom-0 rounded-2xl w-[95%] p-4 mb-3">
              <p className="font-secondary text-white text-xs">{room.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
