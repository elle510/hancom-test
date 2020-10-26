import requestHelper, {
    setMethod,
    setHeaderToken,
    requestMethod,
    call,
} from './requestHelper';

requestHelper.method = requestMethod;

requestHelper.get = call.get;
requestHelper.post = call.post;
requestHelper.put = call.put;
requestHelper.delete = call.delete;

export { setMethod, setHeaderToken };
export default requestHelper;
