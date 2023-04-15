import React from "react";
import UserInfoSubmit from "./UserInfoSubmit";
import PasswordSubmit from "./PasswordSubmit";

const AccountSettings = () => {

    return(
                <div class="tab-pane active"  style={{textAlign : 'left'}}>
                   <UserInfoSubmit />
                    <PasswordSubmit />
                </div>
    );
}
export default AccountSettings;