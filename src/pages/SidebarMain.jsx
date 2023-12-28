import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  LayoutDashboard,
  Settings,
  UsersRound,
  BookKey,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarItem } from "../components/ui/Sidebar";
import React, { useState, useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function SidebarMain() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
      if (localStorage.getItem("access_token") === null) {
        window.location.href = '/login';
      } else if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
  return (
    <main className="App">
      {isAuth ?
      <Navbar>
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={30} />}
          text={"Dashboard"}
          link={"/"}
        />
        <SidebarItem
          icon={<BookKey size={30} />}
          text={"Administrador"}
          link={"/admin"}
        />
        <SidebarItem
          icon={<Boxes size={30} />}
          text={"Inventario"}
          link={"/inventario"}
        />
        <SidebarItem
          icon={<Package size={30} />}
          text={"Pedidos"}
          link={"/pedidos"}
        />
        <SidebarItem
          icon={<Receipt size={30} />}
          text={"Descuentos"}
          link={"/descuentos"}
        />
        <hr className="my-3 hidden md:visible" />
        <SidebarItem
          icon={<Settings size={30} />}
          text={"Ajustes"}
          link={"/settings"}
        />
        <SidebarItem
          icon={<LifeBuoy size={30} />}
          text={"Ayuda"}
          link={"/help"}
        />
      </Sidebar> 
      <div id="Caja Chica">
        <Outlet />
      </div> 
      </Navbar> : <Nav.Link href="/login">Login</Nav.Link> }
    </main>
  ); 
}
