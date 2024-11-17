<template>

  <div class="flex justify-between items-center">
    <!-- Button Add User -->
    <button @click="openModal('Register User')" class="btn btn-info mb-2 text-base-100">
        <i class="fa-solid fa-plus"></i> Add
    </button>

    <!-- Select Search -->
    <!-- <div class="flex items-center gap-2">
        <select v-model="searchType" class="select select-bordered">
            <option disabled value="">Select Search Type</option>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="gender">Gender</option>
            <option value="age">Age</option>
            <option value="username">Username</option>
        </select>

        <input v-model="searchQuery" type="text" placeholder="Enter Search Value" class="input input-bordered">

        <button @click="searchUser" class="btn btn-primary">
            <i class="fa-solid fa-search"></i>
        </button>
    </div> -->
</div>
    <!-- Table Show Users -->
    <div class="overflow-x-auto">
      <table class="table table-sm">
        <thead class="bg-base-300 text-base-content">
          <tr>
            <th>
              <label>
                <input type="checkbox" @change="selectAll" v-model="allSelected" class="checkbox" />
              </label>
            </th>
            <th>#</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Role</th>
            <th>CreateDate</th>
            <th>UpdateDate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <th>
              <label>
                <input type="checkbox" v-model="selectedUsers" :value="user.id" class="checkbox" />
              </label>
            </th>
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.role }}</td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td>{{ formatDate(user.updatedAt) }}</td> 
            <td>
              <button
                @click="openModal('Edit User', user)"
                class="btn btn-circle btn-warning text-base-100 btn-sm mx-2"
              >
                <i class="fa-solid fa-pen"></i>
              </button>
              <button @click="deleteUser(user.id)" class="btn btn-circle btn-error text-base-100 btn-sm mx-2">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <!-- Modal Add User -->
    <Modal
      :isVisible="showModal"
      :modalType="currentModalType"
      :headerName="modalHeader"
      @close="closeModal"
      @submit="addUser"
    >
      <template #body>
        <label class="input input-bordered flex items-center gap-2 mb-2">
          <input type="text" id="name" v-model="add.name" placeholder="Name" class="grow" />
        </label>
        <label>
          <select id="gender" v-model="add.gender" class="select select-bordered mb-2">
            <option disabled value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label class="input input-bordered flex items-center gap-2 mb-2">
          <input type="number" id="age" v-model="add.age" placeholder="Age" class="grow" />
        </label>
        <label class="input input-bordered flex items-center gap-2 mb-2">
          <input type="text" id="phone" v-model="add.phone" placeholder="Phone" class="grow" />
        </label>
        <label class="input input-bordered flex items-center gap-2 mb-2">
          <input type="text" id="username" v-model="add.username" placeholder="Username" class="grow" />
        </label>
        <label class="input input-bordered flex items-center gap-2 mb-2">
          <input type="password" id="password" v-model="add.password" placeholder="Password" class="grow" />
        </label>
        <label class="input input-bordered flex items-center gap-2 mb-2">
          <input type="password" id="confirm_password" v-model="add.confirm_password" placeholder="Confirm Password" class="grow" />
        </label>
      </template>
      <template #footer>
        <button @click="closeModal" class="btn btn-error text-base-100 mr-2">
          <i class="fa-solid fa-xmark"></i> Close
        </button>
        <button @click="checkPass" class="btn btn-success text-base-100 ">
          <i class="fa-solid fa-check"></i> Submit
        </button>
      </template>
    </Modal>
  </template>
  
<script setup>
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Modal from '../components/Modal.vue';

const users = ref([]);
const showModal = ref(false);
const currentModalType = ref('');
const modalHeader = ref('');
const add = ref({
  name: '',
  gender: '',
  age: '',
  phone: '',
  username: '',
  password: '',
  confirm_password: '',
});
const selectedUserId = ref(null);
const allSelected = ref(false); 
const selectedUsers = ref([]); 

// Fetch users from the API
const fetchData = async () => {
  await axios.get(`${import.meta.env.VITE_API}/users`)
    .then((response) => {
      users.value = response.data.data;
    }).catch((err) => {
      console.log(err);
    });
};

// Function to add a user
const addUser = async () => {
  await axios.post(`${import.meta.env.VITE_API}/users/register`, {
    name: add.value.name,
    gender: add.value.gender,
    age: add.value.age,
    phone: add.value.phone,
    username: add.value.username,
    password: add.value.confirm_password,
  })
  .then((response) => {
    console.log(response);
  }).catch((err) => {
    console.log(err);
  });
};

// Function to edit a user
const editUser = async () => {
  await axios.put(`${import.meta.env.VITE_API}/users/${selectedUserId.value}`, {
    name: add.value.name,
    gender: add.value.gender,
    age: add.value.age,
    phone: add.value.phone,
    username: add.value.username,
    password: add.value.confirm_password, 
  })
  .then((response) => {
    console.log('User updated', response);
  }).catch((err) => {
    console.log(err);
  });
};

// Function to delete a user
const deleteUser = async (userId) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      await axios.delete(`${import.meta.env.VITE_API}/users/${userId}`);
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
      fetchData();
    }
  } catch (error) {
    Swal.fire('Error!', 'Failed to delete user. Please check if the user exists.', 'error');
    console.error("Error deleting user:", error);
  }
};

// Function to check passwords and decide whether to add or edit a user
const checkPass = async () => {
  if (add.value.password === add.value.confirm_password) {
    if (currentModalType.value === 'Register User') {
      await addUser();
      Swal.fire('Success', 'User has been added!', 'success');
    } else if (currentModalType.value === 'Edit User') {
      await editUser();
      Swal.fire('Success', 'User has been updated!', 'success');
    }
    closeModal();
    fetchData();
  } else {
    Swal.fire('Warning', "Passwords don't match", 'warning');
    add.value.password = '';
    add.value.confirm_password = '';
  }
};


// Function to open the modal
const openModal = (type, user = null) => {
  currentModalType.value = type;
  modalHeader.value = type === 'Register User' ? 'Add New User' : 'Edit User';
  showModal.value = true;

  if (user) {
    selectedUserId.value = user.id;
   
    add.value.name = user.name;
    add.value.gender = user.gender;
    add.value.age = user.age;
    add.value.phone = user.phone;
    add.value.username = user.username;
    add.value.password = ''; 
    add.value.confirm_password = ''; 
  } else {
    // Clear fields for adding a new user
    selectedUserId.value = null;
    add.value = {
      name: '',
      gender: '',
      age: '',
      phone: '',
      username: '',
      password: '',
      confirm_password: '',
    };
  }
};


const closeModal = () => {
  showModal.value = false;
};

const selectAll = () => {
  if (allSelected.value) {
    selectedUsers.value = users.value.map(user => user.id);
  } else {
    selectedUsers.value = []; 
  }
};

// Set Format Date
const formatDate = (dateString) => {
  if (!dateString) {
    return ''; 
  }
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  if (isNaN(date)) {
    return ''; 
  }
  return date.toLocaleDateString('en-TH', options);
};

onMounted(() => fetchData());
</script>

  
<style lang="scss" scoped></style>