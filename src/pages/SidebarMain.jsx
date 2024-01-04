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
import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { User } from '../api/admin.api';

export function SidebarMain() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = '/login';
    } else if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  useEffect(() => {
    const dataUser = async (token) => {
      const res = await User(token);
      if (res.status === 200) {
        localStorage.setItem("username", res.data[0].username);
        localStorage.setItem("role", res.data[0].group);
      }
    }
    dataUser(localStorage.getItem("access_token"));
  }, [username, role]);

  return (
    <main className="App">
      {isAuth ?
        <Navbar>
          <Sidebar username={username} role={role}>
            <SidebarItem
              icon={<LayoutDashboard size={30} />}
              text={"Dashboard"}
              link={"/"}
            />
            {localStorage.getItem("role") === "Admin" ?
              <SidebarItem
                icon={<BookKey size={30} />}
                text={"Administrador"}
                link={"/admin"}
              /> : null}
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
        </Navbar> : <Nav.Link href="/login">Login</Nav.Link>}
    </main>
  );
}
