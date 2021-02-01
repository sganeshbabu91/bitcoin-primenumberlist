export class programdata {

    numbertoarray(number: any) {
        if (number.toString().split(".").length > 1) {
            number = number.toString().split(".")[0] + number.toString().split(".")[1]
        } else {
            number = number.toString().split(".")[0]
        }
        return number.split('').map(Number);
    }

    unique = (value: any, index: number, self: any) => {
        return self.indexOf(value) === index
    }

    getPrimeNumbers = (number: any) => {
      let  numberlist = this.numbertoarray(number)
        numberlist = numberlist.filter(this.unique)
        numberlist = numberlist.filter((data: any) => {
            if (data === 0 || data === 1) return false;
            for (let i = 2; i <= Math.sqrt(data); i++) {
                if (data % i === 0) return false;
            }
            return true;
        })
        return numberlist.join(",");
    }

    getdateString = (date: any, type: string) => {

        if (typeof date === "string") {
            date = new Date(date)
        }

        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        if (type === 'yeardate') {
            return [year, month, day].join('-');
        } else {
            return [day, month, year].join('-');
        }

    }

}

export default programdata