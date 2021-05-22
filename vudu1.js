document.addEventListener(
  'DOMContentLoaded',
  () => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const name = $('#name');
    const classStu = $('#class');
    const genders = $('#genders');
    const btn = $('#button');
    const main = $('#main');
    const btnCheck = $$('button');
    const ToanEle = $('#Toan');
    const LyEle = $('#Ly');

    var nameVal;
    var markVal;
    var genderVal;
    var markToan;
    var markLy;
    var isCheckMinMax = false;

    name.onchange = function (e) {
      nameVal = e.target.value;
    };
    classStu.onchange = function (e) {
      markVal = e.target.value;
    };
    genders.onchange = function (e) {
      genderVal = e.target.value;
    };
    ToanEle.onchange = function (e) {
      markToan = Number(e.target.value);
    };
    LyEle.onchange = function (e) {
      markLy = Number(e.target.value);
    };
    Add3Acourse();
    class students {
      constructor(name, mark, gender, subjects) {
        this.name = name;
        this.mark = mark;
        this.gender = gender;
        this.subjects = subjects;
      }
      methodShowInfo() {
        console.log('Ten:' + this.name);
        console.log('Diem tich luy:' + this.mark);
        console.log('Gioi tinh:' + this.gender);
        console.log('Diem Mon Hoc:' + this.subjects);
        return this.name + '-' + this.mark;
      }
    }
    // class subjects {
    //   constructor(nameSub, markSub) {
    //     this.nameSub = nameSub;
    //     this.markSub = markSub;
    //   }
    //   get subject() {
    //     return this.nameSub + '-' + this.markSub;
    //   }
    // }
    // const subject = new subjects();

    // console.log(student1);
    const arrayStu = [];
    btn.onclick = function () {
      const student = new students(nameVal, markVal, genderVal, [
        { name: 'Toan', mark: markToan },
        { name: 'Ly', mark: markLy },
      ]);

      arrayStu.push(student);
      var jsonString = JSON.stringify(arrayStu);
      localStorage.setItem('students', jsonString);

      var studentes = localStorage.getItem('students');
      const studentsJson = JSON.parse(studentes);

      renderVal(studentsJson);
      name.value = '';
      classStu.value = '';
      genders.value = '';
      ToanEle.value = '';
      LyEle.value = '';
      sortMinMax(studentsJson);
      sortMaxMin(studentsJson);
      filterGirl(studentsJson);
      filterMath(studentsJson);
      filterMathMinMax(studentsJson);
      DeleteTichLuy0(studentsJson);
    };
    function renderVal(studentsJson) {
      if (studentsJson) {
        var data = '';
        studentsJson.map((value) => {
          data += `<tr>
                        <td>${value.name}</td>
                        <td>${value.mark}</td>
                        <td>${value.gender}</td>
                        <td>${value.subjects[0].name} , ${value.subjects[1].name}</td>
                        <td>${value.subjects[0].mark} , ${value.subjects[1].mark}</td>
                    </tr>`;
        });
      }

      return (main.innerHTML = data);
    }
    function sortMinMax(studentsJson) {
      const arrayMinMax = [];
      const arrayMinMaxInra = [];

      btnCheck[0].onclick = function () {
        for (let i = 0; i < studentsJson.length; i++) {
          arrayMinMax.push(Number(studentsJson[i].mark));
          arrayMinMax.sort();
          console.log(arrayMinMax);
        }
        for (let i = 0; i < arrayMinMax.length; i++) {
          for (let j = 0; j < studentsJson.length; j++) {
            if (arrayMinMax[i] == studentsJson[j].mark) {
              arrayMinMaxInra.push(studentsJson[j]);
              console.log(studentsJson[j]);
              renderVal(arrayMinMaxInra);
            }
          }
        }

        // console.log(arrayMinMax);
        console.log(arrayMinMaxInra);
      };
    }
    function sortMaxMin(studentsJson) {
      const arrayMinMax = [];
      const arrayMinMaxInra = [];
      btnCheck[1].onclick = function () {
        for (let i = 0; i < studentsJson.length; i++) {
          arrayMinMax.push(Number(studentsJson[i].mark));
          arrayMinMax.sort();
          arrayMinMax.reverse();
        }
        for (let i = 0; i < arrayMinMax.length; i++) {
          studentsJson.forEach((value) => {
            if (arrayMinMax[i] == value.mark) {
              arrayMinMaxInra.push(value);
              isCheckMinMax = true;
              renderVal(arrayMinMaxInra);
            }
          });
        }

        console.log(arrayMinMax);
        console.log(arrayMinMaxInra);
      };
    }
    function filterGirl(studentsJson) {
      const arrayGirl = [];
      console.log('ok');

      btnCheck[2].onclick = function () {
        for (let i = 0; i < studentsJson.length; i++) {
          if (studentsJson[i].gender == 'Nữ') {
            if (studentsJson[i].mark > 5) {
              console.log(studentsJson[i]);
              arrayGirl.push(studentsJson[i]);
              renderVal(arrayGirl);
            } else {
              arrayGirl.push(studentsJson[i]);
            }
          }
        }
      };
    }
    function filterGirl(studentsJson) {
      const arrayGirl = [];
      btnCheck[2].onclick = function () {
        for (let i = 0; i < studentsJson.length; i++) {
          if (studentsJson[i].gender == 'Nữ') {
            if (studentsJson[i].mark > 5) {
              console.log(studentsJson[i]);
              arrayGirl.push(studentsJson[i]);
              renderVal(arrayGirl);
            }
          }
        }
      };
    }
    function filterMath(studentsJson) {
      const arrayMath = [];
      btnCheck[3].onclick = function () {
        for (let i = 0; i < studentsJson.length; i++) {
          for (let j = 0; j < studentsJson[i].subjects.length; j++) {
            if (studentsJson[i].subjects[j].mark > 8) {
              arrayMath.push(studentsJson[i]);
              renderVal(arrayMath);
            }
          }
        }
      };
    }
    function filterMathMinMax(studentsJson) {
      const arrayMath = [];
      const arrayMinMax = [];
      var minMark;
      var maxMark;
      btnCheck[4].onclick = function () {
        for (let i = 0; i < studentsJson.length; i++) {
          for (let j = 0; j < studentsJson[i].subjects.length; j++) {
            if (studentsJson[i].subjects[j].name == 'Toan') {
              arrayMinMax.push(Number(studentsJson[i].subjects[j].mark));
              arrayMinMax.sort();
              minMark = arrayMinMax[0];
              maxMark = arrayMinMax[arrayMinMax.length - 1];
              break;
            }
          }
        }
        console.log(minMark, maxMark);
        for (let i = 0; i < studentsJson.length; i++) {
          for (let j = 0; j < studentsJson[i].subjects.length; j++) {
            if (studentsJson[i].subjects[j].mark == maxMark) {
              arrayMath.push(studentsJson[i]);
            }
            if (studentsJson[i].subjects[j].mark == minMark) {
              arrayMath.push(studentsJson[i]);
            }
            renderVal(arrayMath);
            break;
          }
        }
      };
    }
    function DeleteTichLuy0(studentsJson) {
      btnCheck[5].onclick = function () {
        for (let i = 0; i < studentsJson.length; i++) {
          if (studentsJson[i].mark == 0) {
            studentsJson.splice(i, 1);
            renderVal(studentsJson);
          }
        }
      };
    }
    function Add3Acourse() {
      btnCheck[6].onclick = function () {
        var array3Acourse = [];
        for (let i = 0; i < 3; i++) {
          const student123 = new students(
            `Bui Van ${CreateName(1)}`,
            CreateMark(10),
            CreateGender(2),
            [
              { name: 'Toan', mark: CreateMark(10) },
              { name: 'Ly', mark: CreateMark(10) },
            ]
          );
          array3Acourse.push(student123);
          console.log(array3Acourse);
          if (array3Acourse.length == 3) {
            renderVal(array3Acourse);
            sortMinMax(array3Acourse);
            sortMaxMin(array3Acourse);
            filterGirl(array3Acourse);
            filterMath(array3Acourse);
            filterMathMinMax(array3Acourse);
            DeleteTichLuy0(array3Acourse);
          }
        }
      };
    }
    function CreateMark(number) {
      let num;
      num = Math.floor(Math.random() * number);
      return num;
    }

    function CreateName(length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
    function CreateGender(number) {
      let numb = Math.floor(Math.random() * number);

      if (numb == 1) {
        return 'Nam';
      } else {
        return 'Nữ';
      }
    }
  },
  false
);
