window.NhanVienController = function($scope, $http) {
    // Đọc dữ liệu ra màn hình
    var apiURL = 'http://localhost:3000/employees';
    $scope.getData = function(){
        $http.get('http://localhost:3000/employees')
            .then(response => {
                $scope.res = response.data
                $scope.maxId = $scope.res[$scope.res.length - 1].id
            })
    }
    $scope.getData();




    $scope.init = function() {
        // Khai báo dữ liệu mẫu
        $scope.inputValue = {
            name:'',
            date: '',
            salary: '',
            gender: '',
            address: '',
            age: ''
        }
        // Khai báo validate mẫu
        $scope.kiemtradulieu =  {
            name:false,
            date:false,
            salary: false
        };
    }
    $scope.init()
    

    // Validate và tạo dữ liệu mới
    $scope.onSubmit = function() {
        $scope.kiemtradulieu =  {
            name:false,
            date:false,
            salary: false
        };
        let check = true
        if(!$scope.inputValue || !$scope.inputValue.name){
            $scope.kiemtradulieu.name = true;
            check = false
        }
        if(!$scope.inputValue || !$scope.inputValue.date){
            $scope.kiemtradulieu.date = true;
            check = false
        }
        if(!$scope.inputValue || !$scope.inputValue.salary){
            $scope.kiemtradulieu.salary = true;
            check = false
        }

        if(check){
            var newItem = {
                id: Number($scope.maxId) + 1,
                nameNV : $scope.inputValue.name,
                ngaysinhNV: $scope.inputValue.date.toLocaleDateString(),
                luong : $scope.inputValue.salary,
                gioitinh : $scope.inputValue.gender,
                diachi : $scope.inputValue.address,
                tuoi : $scope.inputValue.age,
            }
            $http.post(apiURL, newItem)
                .then( response => {
                    $scope.getData();
                }).catch(error => {
                    console.log(error)
                })
        }
    }


    // Hỏi xóa
    $scope.confirmDelete = function(id){
        $scope.idDelete = id;
    }
    // Xác nhận xóa
    $scope.onDelete = function(){
        if($scope.idDelete != undefined){
            $http.delete(`${apiURL}/${$scope.idDelete}`)
                .then( response => {
                    $scope.getData();
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    // Lấy dữ liệu từ 1 id
    $scope.confirmUpdate = function(id){
        $scope.init();
        $http.get(`${apiURL}/${id}`)
            .then( response => {
                var date = response.data.ngaysinhNV
                var datearray = date.split("/");
                var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];

                $scope.inputValue.name = response.data.nameNV
                $scope.inputValue.date = new Date(newdate)
                $scope.inputValue.salary = response.data.luong
                $scope.inputValue.gender = response.data.gioitinh
                $scope.inputValue.address = response.data.diachi
                $scope.inputValue.age = response.data.tuoi

                $scope.idUpdate = id
            }).catch(error => {
                console.log(error)
            })
    }

    // Cập nhật dữ liệu
    $scope.onUpdate = function(){
        let check = true
        if(!$scope.inputValue || !$scope.inputValue.name){
            $scope.kiemtradulieu.name = true;
            check = false
        }
        if(!$scope.inputValue || !$scope.inputValue.date){
            $scope.kiemtradulieu.date = true;
            check = false
        }
        if(!$scope.inputValue || !$scope.inputValue.salary){
            $scope.kiemtradulieu.salary = true;
            check = false
        }
        if(check){
            var newItem = {
                nameNV : $scope.inputValue.name,
                ngaysinhNV: $scope.inputValue.date.toLocaleDateString(),
                luong : $scope.inputValue.salary,
                gioitinh : $scope.inputValue.gender,
                diachi : $scope.inputValue.address,
                tuoi : $scope.inputValue.age,
            }

            $http.put(`${apiURL}/${$scope.idUpdate}`, newItem)
                .then( response => {
                    $scope.getData();
                }).catch(error => {
                    console.log(error)
                })
        }
    }
}

