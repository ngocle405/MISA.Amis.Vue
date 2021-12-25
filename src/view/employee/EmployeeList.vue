<template>
  <div class="m-content">
    <div class="m-header">
      <div class="m-header-text">Nhân viên</div>
      <button class="m-btn m-btn-add" @click="showformAdd()">
        Thêm mới nhân viên
      </button>
    </div>
    <div class="m-wrap-content">
      <div class="m-content-search">
        <div class="m-content-multidel" >
          <div class="multidel-text">
            <div class="icon" @click="toggleDelMuti = !toggleDelMuti">
              <div class="text">
                <span>Thực hiện hàng loạt</span>
              </div>
              <div class="icon">
                <i class="fas fa-sort-down"></i>
              </div>
            </div>
            <div
              class="multidel-item"
              v-show="toggleDelMuti && selectedId.length > 0"
            >
              <span style="font-size: 16px" @click="DelMutlRecord">xóa</span>
            </div>
          </div>
        </div>
         <div class="m-content-right">
          <div class="m-content-input-search">
            <input
              type="text"
              v-model="searchText"
              class="m-input-search"
              placeholder="Tìm kiếm theo mã hoặc tên"
            />
            <div id="searchBtn" class="m-icon m-icon-search icon-16"></div>
          </div>
          <button @click="refresh" class="m-button-refresh">
            <div id="btnRefresh">
              <div class="m-icon m-icon-refresh icon-24"></div>
            </div>
          </button>
          <div>
            <div
             
              class="m-icon m-icon-export-excel icon-24"
            >
              <a href="https://localhost:44320/api/v1/Employees/Export"></a>
            </div>
          </div>
        </div>
        <!-- <div class="m-content-input-search">
          <input
            type="text"
            class="m-input-search"
            placeholder="Tìm kiếm theo mã hoặc tên"
            v-model="searchText"
          />
          <i class="fas fa-search"></i>
        </div> -->
      
      </div>
      <div class="m-table">
        <table border="0" style="width: 100%" cellspacing="0" cellpadding="">
          <thead>
            <tr>
              <th class="text-align-left">
                <input
                  type="checkbox"
                  v-model="isSelectAllId"
                  @click="selectAllId"
                />
              </th>
              <th class="text-align-left w100">Mã nhân viên</th>
              <th class="text-align-left w200">Tên nhân viên</th>
              <th class="text-align-left w100">Giới tính</th>
              <th class="m-text-center w100">Ngày sinh</th>
              <th class="text-align-left w100">Số CMND</th>
              <th class="text-align-left w100">Chức danh</th>
              <th class="text-align-left" style="min-width: 130px">
                Tên đơn vị
              </th>
              <th class="text-align-left w10">Số tài khoản</th>
              <th class="text-align-left w100">Tên ngân hàng</th>
              <th class="text-align-left w200">Chi nhánh TK ngân hàng</th>
              <th class="text-align-right" style="padding-right: 12px">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.EmployeeId">
              <td>
                <input
                  type="checkbox"
                  v-model="selectedId"
                  @click="selectId(employee.employeeId)"
                  :value="employee.employeeId"
                />
              </td>
              <td>{{ employee.employeeCode }}</td>
              <td>{{ employee.employeeName }}</td>
              <td>{{ employee.gender | formatGender }}</td>
              <td class="m-text-center">
                {{ employee.dateOfBirth | formatDate }}
              </td>
              <td>{{ employee.identityNumber }}</td>
              <td>{{ employee.employeePosition }}</td>
              <td>{{ employee.departmentName }}</td>
              <td>{{ employee.bankAccountNumber }}</td>
              <td>{{ employee.bankName }}</td>
              <td>{{ employee.bankBranchName }}</td>
              <td>
                <button @click="showformUpdate(employee)">Sửa</button>
                <button
                  @click="showContextMenu($event, employee)"
                  class="m-btn-icon down-data-row"
                >
                  <i class="fas fa-sort-down"></i>
                </button>
                <!-- <div class="data-list-row" :id="employee.employeeId">
                  <div class="data-items">
                    <div class="data-item">Nhân bản</div>
                    <div class="data-item" id="btn-delete-row">Xóa</div>
                    <div class="data-item">Ngừng</div>
                  </div>
                </div> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="m-navigation">
        <div class="m-paging-left">
          <div class="m-paging-text-left">
            Tổng số: <b>{{ TotalRecord }}</b> bản ghi
          </div>
        </div>
        <div class="m-paging-center">
          <!--Combobox Phân trang-->
          <ComboboxPagination
            :ListItem="[
              '10 bản ghi trên trang',
              '20 bản ghi trên trang',
              '30 bản ghi trên trang',
              '50 bản ghi trên trang',
              '100 bản ghi trên trang',
            ]"
            v-if="true"
            @handleSelect="changeRecordNumber"
          />
          <PaginationPage
            :totalPages="totalPages"
            @changePage="changePageNumber"
          />
        </div>
      </div>
    </div>
    <!--Toast Message-->
    <ToastMessage :isShowToast="isShowToast" :toastText="toastText" />
    <!--Phần hiện thị msg delete-->

    <!-- Phần loading -->

    <!-- CONTEXT MENU -->
    <div id="contextMenu" v-show="toogleMenu">
      <button>Nhân bản</button>
      <button @click="showFormDelete()">Xóa</button>
      <button>Ngừng sử dụng</button>
    </div>
    <EmployeeDetail
      ref="popupEmployeeDetail"
      v-show="isShow"
      :emp="employee"
      @close-form="btnCloseOnClick"
    />
    <!-- @save="btnSaveOnClick" -->
    <!-- các sự kiện của component DialogConfirm -->
    <!-- <DialogConfirm
      :confirmDelete="confirmDelete"
      :employeeCodeDelete="this.employeeCode"
      @delete-Employee="deleteEmployee"
      @cancel-Detele="cancelDetele"
    /> -->
    <DialogConfirm
      @Delete="deleteEmployee"
      :textMgs="textMgs"
      ref="popUpDelete"
    />
    <!-- các sự kiện của component DialogError -->
    <DialogError
      :isError="isError"
      :textError="textError"
      @close-dialog="closeDialog"
    />
    <!-- các sự kiện của component Loading -->
    <Loading :isLoading="isLoading" />

    <!-- muon lop con nhan thuoc tinh employee tu cha -->
  </div>
</template>

<script>
import axios from "axios";
import EmployeeDetail from "../employee/EmployeeDetail.vue";
import PaginationPage from "../../components/item/PaginationPage.vue";
import ComboboxPagination from "../../components/combobox/ComboboxPagination.vue";
import DialogConfirm from "../../components/item/DialogConfirm.vue";
import ToastMessage from "../../components/item/ToastMessage.vue";
import DialogError from "../../components/item/DialogError.vue";
import Loading from "../../components/item/Loading.vue";
import Resource from "../../js/Resource.js";
//
import $ from "jquery"; //tải jquery
export default {
  components: {
    PaginationPage,
    ComboboxPagination,
    EmployeeDetail,
    DialogConfirm,
    ToastMessage,
    DialogError,
    Loading,
  },
  //Chứa các biến trong Vue, chạy xuyên suốt trong dự án
  data() {
    //Tất cả các thuộc tính và phương thức bạn muốn đưa vào Vue đều phải thông qua key data lúc khởi tạo
    return {
      employees: [],
      employee: {
        employeeCode: "",
        employeeName: "Lê Thanh ",
        gender: "1",
        dateOfBirth: "1999-12-09",
        identityNumber: "1234321456",
        identityDate: "2021-12-07",
        identityPlace: "Hưng yên",
        address: "Hưng yên",
        phoneNumber: "0986756432",
        telephoneNumber: "0986756432",
        email: "test@gmail.com",
        bankAccountNumber: "1968473212",
        bankName: "ACB",
        bankBranchName: "Hưng Yên",
        positionId: "",
        departmentId: "",
        employeePosition: "Nhân viên",
      },
      //

      totalPages: 0, //tổng số trang
      pageSize: 10,
      pageIndex: 1, //chuyển trang
      searchText: "",
      TotalRecord: 0,
      //hiện form
      isShow: false,
      toogleMenu: false,
      confirmDelete: false,
      textMgs: "",
      isShowToast: false,
      toastText: "",
      isError: false,
      textError: "",
      isLoading: false,
      employeeCode: "",
      // danh sách Id nhân viên khi ấn input checkbox -> xoá nhiều
      selectedId: [],
      // có check toàn bộ ô checkbox hay không -> để lấy toàn bộ Id của nhân viên -> xoá toàn bộ
      isSelectAllId: false,
      //
      employeeId: "",
      toggleDelMuti: false,
    };
  },
  mounted() {
    //Hook chạy ngay sau khi component đã được compile và lần render (hiển thị) đầu tiên
    var me = this;
    me.$refs.popupEmployeeDetail.$on("addSuccess", function () {
      me.refresh();
      me.showToastMessage("Đã thêm thành công.");
    });

    me.$refs.popupEmployeeDetail.$on("updateSuccess", function () {
   
      me.showToastMessage("Cập nhật thành công");
         me.refresh();
    });
  },
  created() {
    this.loadData();
  },
  //Chứa các function xử lý sự kiện trong dự án
  methods: {
    //#region Phân trang
    /**
     * Load dữ liệu nhân viên
     * Author: Lê thanh ngọc (07/12/2021)
     */
    loadData() {
      axios
        .get(
          `${Resource.AMIS_SERVICE_URL}/Employees/Paging?limit=${this.pageSize}&pageIndex=${this.pageIndex}&searchtext=${this.searchText}`
        )
        .then((response) => {
          this.employees = response.data.data;
          this.totalPages = response.data.totalPage;
          this.TotalRecord = response.data.totalRecord;
          console.log(response);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    /**
     * Chuyển trang
     * CreatedBy:  LÊ THANH NGỌC (17/12/2021)
     */
    changePageNumber(pageIndex) {
      this.pageIndex = pageIndex;
      this.loadData();
    },
    /**
     * Số lượng bản ghi trên một trang
     * CreatedBy: LÊ THANH NGỌC (14/12/2021)
     */
    changeRecordNumber(pageRecord) {
      this.pageSize = pageRecord;
      this.loadData();
    },
    //#endregion
    /**
     * Hiện from chi tiết nhân viên
     *  CreatedBy: LÊ THANH NGỌC (14/12/2021)
     */

    showformAdd() {
      this.$refs.popupEmployeeDetail.ShowForm();
    },
    showformUpdate(employee) {
      this.$refs.popupEmployeeDetail.ShowForm(employee);
    },
    /**
     * CreatedBy: LÊ THANH NGỌC (14/12/2021)
     * Sự kiện Update dữ liệu
     */

    // /**
    //  * CreatedBy: LÊ THANH NGỌC (14/12/2021)
    //  * sự kiện lưu dữ liệu (chả)
    //  */
    // btnSaveOnClick() {
    //   var me = this;
    //   //lấy dữ liệu

    //   if (me.employeeId != "") {
    //     // //gọi api thực hiện cất dữ liệu
    //     axios
    //       .put(
    //         "http://localhost:44834/api/Employees/" + me.employeeId,
    //         me.employee
    //       )
    //       .then(() => {
    //         me.showToastMessage();
    //         me.employeeId = "";
    //         me.toastText = "Đã sửa thành công";
    //         // sửa thành công sẽ gọi sự kiện close form
    //         me.btnCloseOnClick();

    //         //dữ liệu trên form null
    //         //sự kiện refresh dữ liệu
    //         me.refresh();
    //       })
    //       .catch(function (res) {
    //          const statusCode = res.response.status;
    //         switch (statusCode) {
    //           case 400:
    //             me.textError = res.response.data.data[0];
    //             me.isError = true;
    //             break;
    //           default:
    //             break;
    //         }
    //       });
    //   } else {
    //     axios
    //       .post("http://localhost:44834/api/employees", me.employee)
    //       .then(() => {
    //         me.showToastMessage();
    //         me.toastText = "Đã thêm thành công";
    //         //thêm thành công thì tự động đóng form
    //         me.btnCloseOnClick();

    //         //sự kiện refresh dữ liệu
    //         me.refresh();
    //       })
    //       .catch(function (res) {
    //         const statusCode = res.response.status;
    //         switch (statusCode) {
    //           case 400:
    //             me.textError = res.response.data.data[0];
    //             me.isError = true;
    //             break;
    //           default:
    //             break;
    //         }
    //       });
    //   }
    // },
    /**
     * Hiển thị menu chức năng: xoá, nhân bản, ngưng sử dụng
     * CreatedBy: lê thanh ngọc (19/12/2021)
     */
    showContextMenu(e, employee) {
      this.toogleMenu = true;
      var positionMenu = e.target;
      let contextMenu = $("#contextMenu");
      contextMenu.toggle(); //ấn phán nữa ẩn form
      let top_pos = $(positionMenu).offset().top;
      let left_pos = $(positionMenu).offset().left;
      if (top_pos + 24 <= window.innerHeight - 90) {
        contextMenu.css("top", `calc(${top_pos}px + 24px)`);
      } else {
        contextMenu.css("top", `calc(${top_pos}px - 88px)`);
      }
      contextMenu.css("left", `calc(${left_pos}px - 86px)`);

      this.employeeId = employee.employeeId; //lấy id nv đẻ xóa
      this.employeeCode = employee.employeeCode; //lấy mã nv để hiển thị
    },

    //sự kiện đóng form
    btnCloseOnClick() {
      // this.employee = {};
      //this.isShow = !this.isShow;
      //this.loadData();
      this.$refs.popupEmployeeDetail.closeForm();
    },

    /**
     * Hiển thị form xác nhận xoá
     * CreatedBy:lê thanh ngọc (19/12/2021)
     */
    showFormDelete() {
      var me = this;
      me.$refs.popUpDelete.showForm();
      me.toogleMenu = !me.toogleMenu;
      me.textMgs = `Bạn có muốn xóa nhân viên có mã <${me.employeeCode}> không?`;
    },

    /**
     * Xóa nhiều bản ghi
     * CreateBy: NVChien(23/12/2021)
     */
    DelMutlRecord() {
      this.toggleDelMuti = !this.toggleDelMuti;
      this.toogleMenu = !this.toogleMenu;
      this.textMgs = `Bạn có thực sự muốn danh danh sách nhân viên đã chọn?`;
      this.$refs.popUpDelete.showForm();
    },

    /**
     * Đóng form thông báo lỗi
     * CreatedBy:  lê thanh ngọc (22/12/2021)
     */
    closeDialog() {
      this.isError = false;
      this.textError = "";
    },
    /**
     * Xoá nhân viên
     * CreatedBy: lê thanh ngọc (19/12/2021)
     */
    deleteEmployee() {
      if (this.selectedId.length > 0) {
        axios
          .post(
            `${Resource.AMIS_SERVICE_URL}/Employees/DeleteList/`,
            this.selectedId
          )
          .then(() => {
            this.$refs.popUpDelete.hideForm();
            this.selectedId = [];
            this.showToastMessage("Xóa danh sách thành công");
            //this.toastText = ;
            this.refresh();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        axios
          .delete(`${Resource.AMIS_SERVICE_URL}/Employees/` + this.employeeId)
          .then(() => {
            this.$refs.popUpDelete.hideForm();
            this.showToastMessage("Xóa thành công");

            this.refresh();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    /**
     * Hiển thị Thông báo success
     * CreatedBy: lê thanh ngọc (19/12/2021)
     */
    showToastMessage(string) {
      setTimeout(() => {
        this.isShowToast = true;
      }, 1000);

      setTimeout(() => {
        this.isShowToast = false;
      }, 3000);
      this.toastText = string;
    },
    /**
     * Refresh lại data
     * CreatedBy: lê thanh ngọc (19/12/2021)
     */
    refresh() {
      this.employeeId = "";
      this.loadData();
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    /**
     * Thực hiện lấy toàn bộ Id nhân viên ô checkbox
     * CreatedBy: lê thanh ngọc (24/12/2021)
     */
    selectAllId() {
      if (!this.isSelectAllId) {
        for (let i in this.employees) {
          this.selectedId.push(this.employees[i].employeeId);
        }
      } else {
        this.selectedId = [];
      }
      // console.log(this.selectedId);
    },
    /**
     * Thực hiện lấy từng giá trị Id nhân viên một, tham số truyền vào là một EmployeeId
     * CreatedBy:  lê thanh ngọc (24/12/2021)
     */
    selectId(employeeId) {
      // kiểm tra xem Id đã tồn tại trong mảng selectedId hay chưa
      if (!this.selectedId.includes(employeeId)) {
        this.selectedId.push(employeeId);
      } else {
        // nếu Id đã tồn tại trong mảng selectedId thì sẽ xoá Id đó khỏi mảng - tức là khi 2 lần vào ô checkbox
        this.selectedId.forEach((item, index) => {
          if (employeeId == item) {
            this.selectedId.splice(index, 1);
          }
        });
      }
      console.log(this.selectedId);
    },
    /**
     * định dạng date trong thẻ input
     */
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

  filters: {
    //định dạng 1 đoạn văn bản
    formatGender(val) {
      var rs = "";
      switch (val) {
        case 0:
          rs = "Nữ";
          break;
        case 1:
          rs = "Nam";
          break;
        default:
          rs = "Chưa xác định";
          break;
      }
      return rs;
    },
    formatDate(data) {
      if (data) {
        const newDate = new Date(data);
        var day = newDate.getDate();
        day = day < 10 ? `0${day}` : day;
        var month = newDate.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        var year = newDate.getFullYear();
        return `${day}/${month}/${year}`;
      }
    },
  },
  watch: {
    //theo dõi dữ liệu được thay đổi và theo dõi hđ kèm theo
    /**
     * Tìm kiếm dữ liệu
     * CreatedBy: Lê thanh ngọc (18/12/2021)
     */
    searchText: function () {
      this.loadData();
    },
  },
};
</script>

<style>
</style>