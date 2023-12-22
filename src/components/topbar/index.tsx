"use client";
import React from "react";
import { Layout, Menu } from "antd";

export default function Topbar() {
  const { Header } = Layout;
  const items = new Array(6).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
  }));
  return (
    <div>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
      </Layout>
    </div>
  );
}
