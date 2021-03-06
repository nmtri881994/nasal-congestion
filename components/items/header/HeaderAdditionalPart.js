import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import { i18n, Link, withNamespaces, Router } from '../../../configs/i18next';

import { logout as logoutAction } from '../../../actions/login'

const HeaderAdditionalPart = (props) => {
    return (
        <>
            {props.showAdditionHeader ?
                <div className="header-additional-part-container-1 noselect">
                    {props.navItems.map(item => <Link key={item.id} href={item.link}>
                        <a className="nav-item">
                            <div className="item-container-1">
                                {props.t(item.name ? item.name : '-')}
                            </div>
                        </a>
                    </Link>)}
                    <Link key={"create-post"} href={"/admin/translate"}>
                        <a className="nav-item">
                            <div className="item-container-1 create-post-button">
                                {props.t('create-post')}
                            </div>
                        </a>
                    </Link>
                    {props.loginUser.systemAccessToken === "" ? <Link key={"login"} href={`/login?previous=${props.router.asPath.substring(i18n.language !== 'en' ? i18n.language.length + 1 : 0, props.router.asPath.length + 1)}`}>
                        <a className="nav-item">
                            <div className="item-container-1 login-logout-button">
                                {props.t('login')}
                            </div>
                        </a>
                    </Link> :
                        <a className="nav-item cursor-pointer" onClick={() => props.dispatch(logoutAction(props.loginUser.refreshToken))}>
                            <div className="item-container-1 login-logout-button">
                                {props.t('logout')}
                            </div>
                        </a>
                    }

                </div> : null}

            <style jsx>{`
                .header-additional-part-container-1 {
                    display: flex;
                    flex-direction: column;
                    margin: 10px 20px;
                }

                .item-container-1 {
                    display: flex;
                    justify-content: center;
                    padding: 10px 0;

                    background-color: #4d5466;
                    
                    color: white;
                    border-radius: 5px;
                }
                
                .item-container-1:hover {
                    opacity: 0.6;
                }

                .nav-item:not(:first-of-type){
                    margin-top: 10px;
                }

                .login-logout-button {
                    background-color: #2196F3;
                }

                .create-post-button{
                    background-color: #43a047;
                }
            `}</style>
        </>
    )
};


HeaderAdditionalPart.getInitialProps = async function () {
    return {
        namespacesRequired: ['index']
    }
};

HeaderAdditionalPart.propTypes = {
    t: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    // console.log("headerUser", state);
    return {
        loginUser: state.loginUser
    };
};

export default withNamespaces('index')(connect(mapStateToProps)(withRouter(HeaderAdditionalPart)));