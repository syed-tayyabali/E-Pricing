import parse from 'html-react-parser';

const custumParse = (props, condition = true) => {
    if(condition) {
        return parse(props);
    }
    return null;
}

export {custumParse};