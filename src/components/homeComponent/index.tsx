"use-client"
import React, { useEffect, useState } from 'react'
import { useGetUsersQuery } from "@/redux/services/userApi";
// import { decrement, increment, reset } from "@/redux/features/crudSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addData, fetchData, removeData, updateData } from '@/redux/features/crudSlice';
import { Button, Input, Modal, Table, Form, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
export default function HomeComponent() {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const data = useAppSelector((state) => state.crudReducer.data);
  const loadingAdd = useAppSelector((state) => state.crudReducer.status);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  console.warn('loadingAdd', loadingAdd)
  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
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
          <Button style={{border:'1px solid red'}}
          onClick={() => {
            setIsConfirmModalOpen(true)
            setUserData(data)
          }}
          >Delete</Button>

          <Button style={{border:'1px solid gray'}} onClick={() => {
            setUserData(data)
            showEditModal();
            editForm.setFieldValue('title', data?.title)
            editForm.setFieldValue('body', data?.body)
            }}>Edit</Button>
        </div>
      )
    }
  ]

  const onFinish = async(values: any) => {
    await dispatch(addData({...values, id:Math.random()}))
    handleCancel();
    form.setFieldValue('title', "")
    form.setFieldValue('body', "")
  }

  const onEditFinish = async (values: any) => {
   await dispatch(updateData({ index: userData?.id, newItem: values }));
    handleEditModalCancel();
  }
  return (
    <div>
      <h1 style={{textAlign:'center'}}>User Data</h1>
      <Button type="primary" style={{marginBottom:20}} onClick={() => showModal()}> Add User </Button>
      <Table dataSource={data} columns={columns} />
      {/* add user modal */}
      <Modal title="Add Item" open={isModalOpen}
        footer={false}
        onCancel={handleCancel}>
        <Form
            form={form}
            name="addPage"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="title"
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
              name="body"
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
            <Button htmlType="submit" type='primary'  loading={loadingAdd} disabled={loadingAdd}>Submit</Button>
            </Form>
      </Modal>

       {/* Edit user modal */}
       <Modal title="Edit Item" open={isEditModalOpen}
        footer={false}
        onCancel={handleEditModalCancel}>
        <Form
            form={editForm}
            name="addPage"
            onFinish={onEditFinish}
            layout="vertical"
          >
            <Form.Item
              name="title"
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
              name="body"
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
      <Modal title="Delete Item" open={isConfirmModalOpen}
        onOk={() =>{ 
          dispatch(removeData(userData?.id));
          setIsConfirmModalOpen(false);
        }}
        onCancel={() => setIsConfirmModalOpen(false)}>
          <p style={{color:"red"}}>This action cannot be undone</p>
          <br />
      </Modal>
    </div>
  )
}
