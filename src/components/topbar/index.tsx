"use client";
import React from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Topbar() {
  const  router = useRouter();
  const { Header } = Layout;
  const items = [
    {
      key: 1,
      label: `Home`,
      path: "/home",
    },
    {
      key: 2,
      label: `About`,
      path: "/about",
    },
  ];
  const handleSelect = (e:any) => {
    const selectedKey = e.key;
    const selectedItem = items.find((item) => item.key === selectedKey);

    if (selectedItem) {
      router.push(selectedItem.path);
    }
  };
  return (
    <div>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            onSelect={handleSelect}
            style={{ flex: 1, minWidth: 0 }}
          >
            {items.map((item) => (
              <Menu.Item key={item.key}>
                <Link href={item.path}>
                  <span>{item.label}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Header>
      </Layout>
    </div>
  );
}
