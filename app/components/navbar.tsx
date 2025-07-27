/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { UserDetail } from "./user-detail";
import { FaBolt } from "react-icons/fa6";


export const Navbar = () => {
    return (
        <div className=" bg-gradient-to-br from-purple-400 to-indigo-400 h-full px-3 bg-white sticky top-0 z-90 " >
            <div className=" flex items-center lg:justify-between">
                {/* <MobileSidebar />
                 */}
                <div className="  min-h-[56px] flex items-center lg:justify-between">
                    <FaBolt />
                    <span className="text-lg font-bold">Trip48</span>
                </div>
                <div className="lg:ml-0 ml-auto ">
                    <UserDetail />
                </div>
            </div>
        </div>
    )
}