import PropTypes from 'prop-types';


class MyDay
{
    constructor(num, is_real)
    {
        this.num = num;
//        this.month = month;
        this.is_real = is_real;

//        this.key = month.toString() + '_' + num.toString()
    }
}

MyDay.prototypes = {
    num: PropTypes.number,
//    month: PropTypes.number,
    is_real: PropTypes.bool

//    key: PropTypes.string
}

export default MyDay;
