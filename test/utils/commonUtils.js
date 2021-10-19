import Crypto from 'crypto';

class CommonUtils {
    createRandomEmail() {
        let email = "rallywatch+" + Math.floor(Math.random() * 10000000) + '@mailinator.com';
        return email;
    }
}

export default new CommonUtils();