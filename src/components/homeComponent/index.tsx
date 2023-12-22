"use-client"
import React, { useEffect, useState } from 'react'
import { useGetUsersQuery } from "@/redux/services/userApi";
// import { decrement, increment, reset } from "@/redux/features/crudSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addData, fetchData } from '@/redux/features/crudSlice';
import { Button, Input, Modal, Table, Form } from 'antd';
export default function HomeComponent() {
  const [form] = Form.useForm();

  const data = useAppSelector((state) => state.crudReducer.data);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchData())
  },[dispatch])

  const columns = [
    {
      title:"User Id",
      render:(__:any,data:any)=> (
        <span>{data?.id}</span>
      )
    },
    {
      title:"Title",
      render:(_:any,data:any)=> (
        <span>{data?.title}</span>
      )
    },
    {
      title:"Content",
      render:(__:any,data:any)=> (
        <span>{data?.body}</span>
      )
    },
    {
      title:"Action",
      render:(__:any,data:any)=> (
        <div style={{display:'flex', gap:8}}>
          <Button style={{border:'1px solid red'}}>Delete</Button>
          <Button style={{border:'1px solid gray'}}>Edit</Button>
        </div>
      )
    }
  ]

  const onFinish = async(values: any) => {
    const data = await dispatch(addData(values))
    handleCancel();
  }

  return (
    <div>
      <h1 style={{textAlign:'center'}}>User Data</h1>
      <Button type="primary" style={{marginBottom:20}} onClick={() => showModal()}> Add User </Button>
      <Table dataSource={data} columns={columns} />
      {/* add user modal */}
      <Modal title="Basic Modal" open={isModalOpen}
        footer={false}
        onCancel={handleCancel}>
        <Form
            form={form}
            name="addPage"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="Title"
              label={"Title"}
              rules={[
                {
                  required: true,
                  message: 'Please input title!',
                }
              ]}
            >
            
              <Input placeholder="enter title..." />
            </Form.Item>
            <Form.Item
              name="content"
              label={"Content"}
              rules={[
                {
                  required: true,
                  message: 'Please input url!',
                }
              ]}
            >
            
              <Input placeholder="type here.." />
              </Form.Item>
            <Button htmlType="submit" type='primary'>Submit</Button>
            </Form>
      </Modal>
    </div>
  )
}
