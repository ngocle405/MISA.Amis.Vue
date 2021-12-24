<template>
  <div class="m-modal" v-show="isShow">
    <div class="m-dialog">
      <div class="m-dialog-header">
        <div class="m-dialog-title">
          <h2>Thông tin nhân viên</h2>
          <div class="input-group-lable">
            <input type="checkbox" name="" id="m-customer-checked" />
            <label for="customer">Là khách hàng</label>
          </div>
          <div class="input-group-lable">
            <input type="checkbox" name="" id="m-supplier-checked" />
            <label for="supplier">Là nhà cung cấp</label>
          </div>
        </div>
        <div class="m-dialog-close">
          <button class="m-btn-question">
            <i class="far fa-question-circle"></i>
          </button>
          <button class="m-btn-close" @click="closeForm">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div class="form-info">
        <div class="form-info-left">
          <div class="form-group-row">
            <div class="form-group">
              <label for="">Mã <span>*</span></label>
              <input
                v-model="emp.employeeCode"
                type="text"
                class="m-input m-input-employeecode"
                name=""
                id="txtemployeecode"
              />
            </div>
            <div class="form-group">
              <label for="">Tên <span>*</span></label>
              <input
                type="text"
                v-model="emp.employeeName"
                class="m-input m-input-fullname"
              />
            </div>
          </div>
          <div class="form-group-row">
            <div class="form-group">
              <label for="">Đơn vị <span>*</span></label>
              <ComboboxDepartment
               :options="Department"
                @select="selectOptionDepartment"
               :value="emp.departmentName"
                 v-model="emp.departmentId"
              />
            </div>
                  <!--  -->
          </div>
          <div class="form-group-row">
            <div class="form-group">
              <label for="">Chức danh <span>*</span></label>
              <div class="scombobox">
                <input
                  type="text"
                  id=""
                  class="s-combobox-input"
                  v-model="emp.employeePosition"
                />
                <!-- <div class="s-combobox-buton">
                    <i class="fas fa-sort-down"></i>
                  </div>
                  <div class="s-combobox-data"></div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="form-info-right">
          <div class="form-group-row">
            <div class="form-group">
              <label for="">Ngày sinh <span>*</span></label>
              <input
                type="date"
                class="m-input m-input-dateofbirth"
                v-model="emp.dateOfBirth"
              />
            </div>
            <div class="form-group">
              <label for="" class="lbgender">Giới tính <span>*</span></label>
              <div class="group-radio">
                <div class="group-radio-item">
                  <input v-model="emp.gender" type="radio" class="" value="1" />
                  <label for="">Nam</label>
                </div>
                <div class="group-radio-item">
                  <input v-model="emp.gender" type="radio" value="0" />
                  <label for="">Nữ</label>
                </div>
                <div class="group-radio-item">
                  <input v-model="emp.gender" type="radio" value="2" />
                  <label for="">Khác</label>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group-row">
            <div class="form-group">
              <label for="">Số chứng minh thư nhân dân</label>
              <input
                type="text"
                class="m-input m-input-card"
                v-model="emp.identityNumber"
              />
            </div>
            <div class="form-group">
              <label for="">Ngày cấp</label>
              <input
                type="date"
                class="m-input m-input-dateofbirth"
                v-model="emp.identityDate"
              />
            </div>
          </div>
          <div class="form-group-row">
            <div class="form-group">
              <label for="">Nơi cấp</label>
              <input
                type="text"
                class="m-input m-input-issued-by"
                v-model="emp.identityPlace"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="form-contact">
        <div class="form-group-row">
          <div class="form-group">
            <label for="">Địa chỉ</label>
            <input
              type="text"
              class="m-input m-input-address"
              v-model="emp.address"
            />
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label for="">Đt di động</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="emp.phoneNumber"
            />
          </div>
          <div class="form-group">
            <label for="">Đt cố định</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="emp.telephoneNumber"
            />
          </div>
          <div class="form-group">
            <label for="">Email</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="emp.email"
            />
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label for="">Tài khoản ngân hàng</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="emp.bankAccountNumber"
            />
          </div>
          <div class="form-group">
            <label for="">Tên ngân hàng</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="emp.bankName"
            />
          </div>
          <div class="form-group">
            <label for="">Chi nhánh</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="emp.bankBranchName"
            />
          </div>
        </div>
      </div>
      <div class="m-dialog-footer">
        <div>
          <button
            @click="closeForm"
            type="button"
            class="m-form-btn m-btn-close"
          >
            Hủy
          </button>
        </div>
        <div>
          <button type="button" class="m-form-btn">Cất</button>
          <button type="submit" class="m-form-btn m-btn-save" @click="btnSave">
            <!-- {{ text }} -->
            Cắt và Thêm
          </button>
        </div>
      </div>
    </div>
    <div class="dialog-background"></div>
  </div>
</template>

<script>
import axios from "axios";
import ComboboxDepartment from "../../components/combobox/ComboboxDepartment.vue";
export default {
  components: {
    ComboboxDepartment,
  },

  props: {
    //emp: Object, //
   // isShow: Boolean,
  },
  data() {
    // là một attribute tùy chỉnh dùng để truyền data từ component cha đến con
    return {
      value: "",
      emp:{
           employeeCode:""
      },
      isShow: false,
      Department: [],
      
    };
    
  },
   created() {
    this.loadDepartment();
  },
  methods: {
    closeForm() {
      this.value = "";
      this.$emit("close-form");
    },
    //    btnAddOnClick() {
    //   const me = this;
    //   axios
    //     .get(`http://localhost:44834/api/Employees/EmployeeNewCode`)
    //     .then((response) => {
    //       me.emp.employeeCode = response.data;
    //       this.isShow = true;
    //       // $("txtemployeecode").focus();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    /**
     * Lấy ra danh sách deparment để laod cbb
     * load department ra dc cbb
     * Author: lê thanh ngọc (12/12/2021)
     */
    loadDepartment() {
      axios
        .get(`http://localhost:44834/api/departments`)
        .then((res) => {
          this.Department = res.data;
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
     /**
     * Lấy ra value khi mà mình chọn cbb
     * Author: NVChien (9/12/2021)
     */
    selectOptionDepartment(option) {
      this.value= option.departmentName;
      this.emp.departmentId = option.departmentId;
    },

    /**
     * gọi cho thằng cha biết con đang thực hiện save
     */
    btnSave() {
      this.$emit("save", this.emp);
    },
  },
};
</script>

<style>
</style>