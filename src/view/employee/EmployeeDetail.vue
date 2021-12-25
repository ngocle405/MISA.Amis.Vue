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
                v-model="employee.employeeCode"
                type="text"
                class="m-input m-input-employeecode"
                name=""
                ref="txtemployeecode"
                :class="{ 'm-input-error': $v.employee.employeeCode.$error }"
                @blur="$v.employee.employeeCode.$touch()"
                :title="
                  $v.employee.employeeCode.$error
                    ? titleEmployeeCodeIsNull
                    : null
                "
              />
            </div>
            <div class="form-group">
              <label for="">Tên <span>*</span></label>
              <input
                type="text"
                v-model="employee.employeeName"
                class="m-input m-input-fullname"
                :class="{ 'm-input-error': $v.employee.employeeName.$error }"
                @blur="$v.employee.employeeName.$touch()"
                :title="
                  $v.employee.employeeName.$error ? titleEmployeeIsNull : null
                "
              />
            </div>
          </div>
          <div class="form-group-row">
            <div class="form-group">
              <label for="">Đơn vị <span>*</span></label>
              <ComboboxDepartment
                :options="Department"
                @select="selectOptionDepartment"
                :departmentName="employee.departmentName"
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
                  v-model="employee.employeePosition"
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
                v-model="employee.dateOfBirth"
              />
            </div>
            <div class="form-group">
              <label for="" class="lbgender">Giới tính <span>*</span></label>
              <div class="group-radio">
                <div class="group-radio-item">
                  <input
                    v-model="employee.gender"
                    type="radio"
                    class=""
                    value="1"
                  />
                  <label for="">Nam</label>
                </div>
                <div class="group-radio-item">
                  <input v-model="employee.gender" type="radio" value="0" />
                  <label for="">Nữ</label>
                </div>
                <div class="group-radio-item">
                  <input v-model="employee.gender" type="radio" value="2" />
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
                v-model="employee.identityNumber"
              />
            </div>
            <div class="form-group">
              <label for="">Ngày cấp</label>
              <input
                type="date"
                class="m-input m-input-dateofbirth"
                v-model="employee.identityDate"
              />
            </div>
          </div>
          <div class="form-group-row">
            <div class="form-group">
              <label for="">Nơi cấp</label>
              <input
                type="text"
                class="m-input m-input-issued-by"
                v-model="employee.identityPlace"
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
              v-model="employee.address"
            />
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label for="">Đt di động</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="employee.phoneNumber"
            />
          </div>
          <div class="form-group">
            <label for="">Đt cố định</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="employee.telephoneNumber"
            />
          </div>
          <div class="form-group">
            <label for="">Email</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="employee.email"
            />
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label for="">Tài khoản ngân hàng</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="employee.bankAccountNumber"
            />
          </div>
          <div class="form-group">
            <label for="">Tên ngân hàng</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="employee.bankName"
            />
          </div>
          <div class="form-group">
            <label for="">Chi nhánh</label>
            <input
              type="text"
              class="m-input m-input-info"
              v-model="employee.bankBranchName"
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
          <button
            type="submit"
            class="m-form-btn m-btn-save"
            @click="btnSaveOnClick"
          >
            <!-- {{ text }} -->
            Cắt và Thêm
          </button>
        </div>
      </div>
    </div>
    <div class="dialog-background"></div>
    <DialogError ref="popUpError" :textError="textError" />
  </div>
</template>

<script>
import axios from "axios";
import ComboboxDepartment from "../../components/combobox/ComboboxDepartment.vue";
import DialogError from "../../components/item/DialogError.vue";
import { required } from "vuelidate/lib/validators";
import Resource from "../../js/Resource";
export default {
  components: {
    ComboboxDepartment,
    DialogError,
  },

  props: {
    //emp: Object, //
    // isShow: Boolean,
  },
  data() {
    // là một attribute tùy chỉnh dùng để truyền data từ component cha đến con
    return {
      value: "",
      titleEmployeeIsNull: Resource["VN"].Warning.FullNameIsEmpty,
      titleEmployeeCodeIsNull: Resource["VN"].Warning.EmployeeCodeIsEmpty,
      titleDateOfBirthError: Resource["VN"].Warning.DateOfBirthError,
      employee: {
        employeeId: "00000000-0000-0000-0000-000000000000",
        employeeCode: "",
        departmentName: "",
      },
      isShow: false,
      // employeeId: "",
      Department: [],
      departmentName: "",
      checkStatusForm: 0,
      textError: "",
    };
  },
  created() {
    this.loadDepartment();
  },
  methods: {
    closeForm() {
      //this.value = "";
      //this.$emit("close-form");
      this.isShow = false;
      this.employee = { employeeCode: "", departmentName: "" };
    },
    ShowForm(entity) {
      const me = this;
      if (entity) {
        entity.dateOfBirth = this.formatDateInput(entity.dateOfBirth);
        entity.identityDate = this.formatDateInput(entity.identityDate);
        console.log(entity.employeeId);
        // entity.gender = this.ChangeGender(entity.gender);
        this.employee = entity;
        entity.employeeId;
        this.EditMode = "Edit";
      } else {
        this.EditMode = "Add";
        axios
          .get(`${Resource.AMIS_SERVICE_URL}/Employees/EmployeeNewCode`)
          .then((response) => {
            me.employee.employeeCode = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      }
      this.isShow = true;
      setTimeout(() => {
        me.$refs.txtemployeecode.focus();
      });
    },
    /**
     * Lấy ra danh sách deparment để laod cbb
     * load department ra dc cbb
     * Author: lê thanh ngọc (12/12/2021)
     */
    loadDepartment() {
      axios
        .get(`${Resource.AMIS_SERVICE_URL}/departments`)
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
      this.employee.departmentName = option.departmentName;
      this.employee.departmentId = option.departmentId;
    },
    /**
     * CreatedBy: LÊ THANH NGỌC (14/12/2021)
     * sự kiện lưu dữ liệu (chả)
     */
    btnSaveOnClick() {
      var me = this;
      //lấy dữ liệu

      if (this.EditMode == "Add") {
        // //gọi api thực hiện cất dữ liệu
        axios

          .post(`${Resource.AMIS_SERVICE_URL}` + "/employees/", me.employee)
          .then(() => {
            me.$emit("addSuccess");
            this.isShow = false;
            //sự kiện refresh dữ liệu
            // me.refresh();
          })
          .catch(function (res) {
            const statusCode = res.response.status;
            switch (statusCode) {
              case 400:
                me.textError = res.response.data.data[0];
                me.$refs.popUpError.showFormError();
                //  me.isError = true;
                break;
              default:
                break;
            }
          });
      } else {
        axios
          .put(
            `${Resource.AMIS_SERVICE_URL}` +
              "/Employees/" +
              this.employee.employeeId,
            me.employee
          )
          .then(() => {
            // me.showToastMessage();
            // me.employeeId = "";
            me.$emit("updateSuccess");
            me.isShow = false;
            this.employee={employeeCode:"",employeeName:"",departmentId:""};

            // sửa thành công sẽ gọi sự kiện close form
          })

          .catch(function (res) {
            const statusCode = res.response.status;
            switch (statusCode) {
              case 400:
                me.textError = res.response.data.data[0];
                me.$refs.popUpError.showFormError();
                break;
              default:
                break;
            }
          });
      }
    },

    formatDateInput(data) {
      if (data) {
        var newDate = new Date(data);
        var day = newDate.getDate();
        day = day < 10 ? `0${day}` : day;
        var month = newDate.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        var year = newDate.getFullYear();
        return year + "-" + month + "-" + day;
      }
    },
  },
  validations: {
    employee: {
      employeeCode: {  required},
      
      employeeName: {  required},
      dateOfBirth: {  required},
      identityDate: {  required},
      //employeeCode: {  required},
     
      
    },
  },
};
</script>

<style>
</style>