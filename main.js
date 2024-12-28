const n = document.querySelector("#courseName");
const category = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");
const sub = document.querySelector("#click");
const invalid = document.querySelector(".invalidName");
const invalidCategory = document.querySelector(".invalidCategory");
const invalidPrice = document.querySelector(".invalidPrice");
const invalidDescription = document.querySelector(".invalidDescription");
const invalidCapacity = document.querySelector(".invalidCapacity");
const delet = document.querySelector("#deleteBtn");
const search = document.querySelector("#search");
let cources = [];
let bool = true;
if (localStorage.getItem("cources") != null) {
    cources = JSON.parse(localStorage.getItem("cources"));
    displayData();
}
sub.addEventListener('click', (e) => {
    e.preventDefault();
    const namePattern = /^[A-Z][a-z]{3,8}$/;
    if (!namePattern.test(n.value)) {
        invalid.innerHTML = 'PLEASE FIRST CAPETAL LETTER AND COPLETE THEM (3-8)SMALL LETER';
        n.classList.add('is-invalid');
        bool = false;
    }
    else {
        invalid.innerHTML = '';
        n.classList.remove('is-invalid');
        n.classList.add('is-valid');
    }
    const categorPattern = /^[A-Z][a-z]{2,3}$/;
    if (!categorPattern.test(category.value)) {
        invalidCategory.innerHTML = 'PLEASE FIRST CAPETAL LETTER AND COPLETE THEM (3-8)SMALL LETER';
        category.classList.add('is-invalid');
        bool = false;
    }
    else {
        invalidCategory.innerHTML = '';
        category.classList.remove('is-invalid');
        category.classList.add('is-valid');
    }
    const pricePattern = /[20-200]/;
    if (!pricePattern.test(price.value)) {
        invalidPrice.innerHTML = 'PLEASE FIRST CAPETAL LETTER AND COPLETE THEM (3-8)SMALL LETER';
        price.classList.add('is-invalid');
        bool = false;
    }
    else {
        invalidPrice.innerHTML = '';
        price.classList.remove('is-invalid');
        price.classList.add('is-valid');
    }

    const capacityPattern = /[0-9]/;
    if (!capacityPattern.test(capacity.value)) {
        invalidCapacity.innerHTML = 'PLEASE FIRST CAPETAL LETTER AND COPLETE THEM (3-8)SMALL LETER';
        capacity.classList.add('is-invalid');
        bool = false;
    }
    else {
        invalidCapacity.innerHTML = '';
        capacity.classList.remove('is-invalid');
        capacity.classList.add('is-valid');
    }
    if (bool == true) {
        let course = {
            name: n.value,
            category: category.value,
            price: price.value,
            description: description.value,
            capacity: capacity.value
        }
        cources.push(course);
        localStorage.setItem('cources', JSON.stringify(cources));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",

        });
        displayData();

    }



})
function displayData() {
    let data = cources.map((cour, index) => {
        return `
        <tr>
        <td>${index}</td>
        <td>${cour.name}</td>
        <td>${cour.category}</td>
        <td>${cour.price}</td>
        <td>${cour.description}</td>
        <td>${cour.capacity}</td>
        <td><button class="delete btn btn-danger" onclick='updateData(${index})' >update</button></td>
        <td><button class="delete btn btn-danger" onclick='deletData(${index})' >delete</button></td>
            </tr>
        `}).join('');
    document.querySelector("#data").innerHTML = data;
}
function deletData(index) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            cources.splice(index, 1);
            localStorage.setItem('cources', JSON.stringify(cources));
            displayData();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
}
delet.addEventListener('click', () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            cources = []; // Use a consistent variable name
            localStorage.setItem('courses', JSON.stringify(cources));
            displayData();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
});
function updateData(index) {
    let bool = true;

    // التحقق من الحقل name
    const namePattern = /^[A-Z][a-z]{2,7}$/; // الحروف الكبيرة والصغيرة (3-8)
    if (!namePattern.test(n.value)) {
        invalid.innerHTML = 'Please start with a capital letter and complete with 2-7 small letters (3-8 characters total).';
        n.classList.add('is-invalid');
        bool = false;
    } else {
        invalid.innerHTML = '';
        n.classList.remove('is-invalid');
        n.classList.add('is-valid');
    }

    // التحقق من الحقل category
    const categoryPattern = /^[A-Z][a-z]{2,3}$/; // الحروف الكبيرة والصغيرة (3-4)
    if (!categoryPattern.test(category.value)) {
        invalidCategory.innerHTML = 'Please start with a capital letter and complete with 2-3 small letters (3-4 characters total).';
        category.classList.add('is-invalid');
        bool = false;
    } else {
        invalidCategory.innerHTML = '';
        category.classList.remove('is-invalid');
        category.classList.add('is-valid');
    }

    // التحقق من الحقل price
    const pricePattern = /^(20|[2-9]\d|1\d{2}|200)$/; // القيم بين 20 و200
    if (!pricePattern.test(price.value)) {
        invalidPrice.innerHTML = 'Please enter a number between 20 and 200.';
        price.classList.add('is-invalid');
        bool = false;
    } else {
        invalidPrice.innerHTML = '';
        price.classList.remove('is-invalid');
        price.classList.add('is-valid');
    }

    // التحقق من الحقل capacity
    const capacityPattern = /^[1-9]\d*$/; // الأرقام الصحيحة الموجبة
    if (!capacityPattern.test(capacity.value)) {
        invalidCapacity.innerHTML = 'Please enter a positive integer for capacity.';
        capacity.classList.add('is-invalid');
        bool = false;
    } else {
        invalidCapacity.innerHTML = '';
        capacity.classList.remove('is-invalid');
        capacity.classList.add('is-valid');
    }

    // إذا كانت كل الحقول صحيحة، يتم التحديث
    if (bool) {
        let updatedCourse = {
            name: n.value.trim(),
            category: category.value.trim(),
            price: parseFloat(price.value),
            description: description.value.trim(),
            capacity: parseInt(capacity.value)
        };

        // التأكد من صحة المؤشر
        if (index < 0 || index >= cources.length) {
            Swal.fire("Error", "Invalid index for update.", "error");
            return;
        }

        // تحديث الدورة
        cources[index] = updatedCourse;
        localStorage.setItem('cources', JSON.stringify(cources));

        // إظهار رسالة النجاح
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Course updated successfully!",
            showConfirmButton: false,
            timer: 1500
        });

        // تحديث البيانات المعروضة
        displayData();
    }
}
search.addEventListener('input', (e) => {
    const kea = search.value.toLowerCase();

    // تصفية البيانات بناءً على البحث
    const filteredData = cources.filter((course) => {
        return course.name.toLowerCase().includes(kea);
    });

    // إنشاء الجدول بناءً على البيانات المصفاة
    let data = filteredData.map((cour, filteredIndex) => {
        // احصل على المؤشر الأصلي للعنصر في المصفوفة الكاملة
        const originalIndex = cources.indexOf(cour);

        return `
        <tr>
          <td>${filteredIndex + 1}</td>
          <td>${cour.name}</td>
          <td>${cour.category}</td>
          <td>${cour.price}</td>
          <td>${cour.description}</td>
          <td>${cour.capacity}</td>
          <td><button class="btn btn-warning" onclick='updateData(${originalIndex})'>Update</button></td>
          <td><button class="btn btn-danger" onclick='deletData(${originalIndex})'>Delete</button></td>
        </tr>
      `;
    }).join('');

    // عرض البيانات في الجدول
    document.querySelector("#data").innerHTML = data;
});

