(this["webpackJsonpinsta-clone"]=this["webpackJsonpinsta-clone"]||[]).push([[0],{37:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){},86:function(e,t,n){},90:function(e,t,n){},91:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(14),o=n.n(s),c=(n(61),n(62),n.p,n(63),n(17)),i=n(11),l=n(15),d=n(12),u=n(19),j=(n(37),n(7)),h=n(16),p=n(22),b=n(33),m=n.n(b).a.create({baseURL:"http://127.0.0.1:8000/insta_backend/",timeout:5e3,headers:{"Content-Type":"application/json",accept:"application/json"}}),f=n(1),O=Object(a.createContext)();function g(e){var t=e.children,n=function(){var e=Object(a.useState)({access_token:localStorage.getItem("access_token"),username:null}),t=Object(l.a)(e,2),n=t[0],r=t[1];return{user:n,signin:function(e,t){var n=t.username;r({access_token:localStorage.getItem("access_token"),username:n}),e&&e()},signout:function(e){localStorage.removeItem("access_token"),r({access_token:null,username:null}),e&&e()}}}();return Object(f.jsx)(O.Provider,{value:n,children:t})}var x=function(){return Object(a.useContext)(O)};var v=n(24),y=n(25),w=n(28),S=n(26),C=n(94),k=n(49),L=n(50),N=(n(86),function(e,t){var n=[];console.log("findByType: component details ",t.name),console.log("findByType: children details ",e);var a=[t.displayName||t.name];return console.log("findByType: type details ",a),r.a.Children.forEach(e,(function(e){console.log("findByType: child details",e.type.name);var t=e&&e.type&&(e.type.displayName||e.type.name);a.includes(t)&&n.push(e)})),console.log("findByType: result details ",n),n[0]}),P=function(){return null},B=function(){return null},E=function(e){Object(w.a)(n,e);var t=Object(S.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).operateChildren=function(e){r.a.Children.forEach(e,(function(e){console.log(e,e.name,e.displayName,e.type)}))},a.closeModal=function(){a.props.onClose&&a.props.onClose()},a.el=document.getElementById("root"),a.state={display:!1},a}return Object(y.a)(n,[{key:"componentWillUnmount",value:function(){}},{key:"renderHeader",value:function(){var e=this;return this.props.title?Object(f.jsxs)("div",{className:"d-flex-horizontal modal-header",children:[this.props.title,this.props.closable&&Object(f.jsx)(k.a,{icon:L.a,onClick:function(){return e.closeModal()}})]}):null}},{key:"renderFooter",value:function(){var e=this.props.children,t=N(e,P);return t?Object(f.jsx)("div",{className:"d-flex-horizontal modal-footer",children:t.props.children}):null}},{key:"renderBody",value:function(){var e=this.props.children;console.log(e);var t=N(e,B);return console.log(t),t?Object(f.jsx)("div",{style:{padding:"10px"},children:t.props.children}):null}},{key:"componentDidMount",value:function(){this.setState({display:this.props.display})}},{key:"componentDidUpdate",value:function(e){this.props.display!==e.display&&this.setState({display:this.props.display})}},{key:"render",value:function(){return o.a.createPortal(Object(f.jsx)(C.a,{in:this.state.display,unmountOnExit:!0,timeout:{enter:0,exit:300},children:Object(f.jsx)(f.Fragment,{children:Object(f.jsx)("div",{className:"overlay",children:Object(f.jsx)("div",{className:"loading-screen-container ".concat(this.state.display?"modal-show":""),children:Object(f.jsxs)("div",{className:"d-flex-vertical vertical-flex-container m-10",children:[this.renderHeader(),this.renderBody(),this.renderFooter()]})})})})}),document.getElementById("root"))}}]),n}(r.a.Component);E.Header=function(){return null},E.Body=B,E.Footer=P;var I=E;function T(e){var t=Object(a.useState)(""),n=Object(l.a)(t,2),s=n[0],o=n[1],b=Object(a.useState)(""),O=Object(l.a)(b,2),g=O[0],v=O[1],y=Object(a.useState)({registrationSuccess:!1,failedLogin:!1}),w=Object(l.a)(y,2),S=w[0],C=w[1],k=Object(j.h)(),L=x();console.log(L);Object(j.g)();var N=m;var P=function(e,t){C(Object(i.a)(Object(i.a)({},S),{},Object(c.a)({},e,t)))};return Object(a.useEffect)((function(){var e;window.history.replaceState({key:"",state:{}},""),(null===(e=k.state)||void 0===e?void 0:e.displaySuccessAlert)&&(C(Object(i.a)(Object(i.a)({},S),{},{registrationSuccess:!0})),setTimeout((function(){return C(Object(i.a)(Object(i.a)({},S),{},{registrationSuccess:!1}))}),5e3))}),[k]),L.user.access_token?Object(f.jsx)(j.a,{to:{pathname:"/feed"}}):Object(f.jsxs)(r.a.Fragment,{children:[Object(f.jsxs)(I,{display:S.failedLogin,title:"Login Failed",onClose:function(){return P("failedLogin",!1)},closable:!0,children:[Object(f.jsx)(I.Body,{children:"Incorrect password or email. Please retry."}),Object(f.jsx)(I.Footer,{children:Object(f.jsx)(u.a,{onClick:function(){return P("failedLogin",!1)},children:"Retry"})})]}),Object(f.jsx)(p.a,{style:{position:"absolute",top:0,left:0,width:"100%"},variant:"success",show:S.registrationSuccess,children:"You've registered successfully! Login and explore..."}),Object(f.jsxs)("div",{className:"Login Login-Box m-350",children:[Object(f.jsx)("h1",{className:"app-name",children:"PhotoShare"}),Object(f.jsxs)(d.a,{onClick:function(e){if(e.preventDefault(),s.length>0&&g.length>0)try{N.post("/token/obtain",{username:s,password:g}).then((function(e){console.log(e),N.defaults.headers.Authorization="JWT "+e.data.access,localStorage.setItem("access_token",e.data.access),localStorage.setItem("refresh_token",e.data.refresh),L.signin(void 0,{username:e.data.username})})).catch((function(e){401===e.response.status&&C(Object(i.a)(Object(i.a)({},S),{},{failedLogin:!0}))}))}catch(t){throw t}},children:[Object(f.jsxs)(d.a.Group,{controlId:"formBasicEmail",children:[Object(f.jsx)("br",{}),Object(f.jsx)(d.a.Control,{type:"email",placeholder:"Enter email...",className:"login-input thin-border",onChange:function(e){return o(e.target.value)}}),Object(f.jsx)("br",{}),Object(f.jsx)(d.a.Control,{type:"password",placeholder:"Enter password...",className:"login-input thin-border",onChange:function(e){return v(e.target.value)}})]}),Object(f.jsx)(u.a,{className:"button",variant:"primary",type:"submit",children:"Log In"})]})]}),Object(f.jsxs)("div",{className:"Login-Box Bottom-Box",children:["Don't have an account? ",Object(f.jsx)(h.b,{to:"/register",children:"Register"})]})]})}var F=n(93),_=(n(90),function(e){Object(w.a)(n,e);var t=Object(S.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).checkIfFormValid=function(){for(var e={},t=!1,n=0,r=Object.entries(a.state);n<r.length;n++){var s=Object(l.a)(r[n],2),o=s[0],c=s[1];["username","email","password","confirmPassword"].includes(o)&&(null===c||void 0===c||""===c?(e["alert"+o]=a.EMPTYMESSAGE[o],t=!0):e["alert"+o]="")}return console.log(e),a.setState(e),console.log("Status of validation is ",t),!t},a.handleSubmit=function(e){e.preventDefault(),a.checkIfFormValid()&&(a.setState({showLoad:!0}),a._axiosInstance.post("/user/create",{username:a.state.username,password:a.state.password,email:a.state.email}).then((function(e){setTimeout((function(){return a.setState({redirectToLogin:!0,showLoad:!1})}),4e3)})).catch((function(e){console.log(e.response)})))},a.recordValue=function(e,t){a.setState(Object(c.a)({},t,e))},a.EMPTYMESSAGE={username:"Please enter a username.",email:"Please enter an email address.",password:"Please enter your password.",confirmPassword:"Please confirm your password."},a._axiosInstance=m,a.state={username:"",email:"",password:"",confirmPassword:"",alertusername:"",alertemail:"",alertpassword:"",alertconfirmPassword:"",showLoad:!1,redirectToLogin:!1},a}return Object(y.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){this.setState({redirectToLogin:!1})}},{key:"render",value:function(){var e=this;return this.state.redirectToLogin?Object(f.jsx)(j.a,{to:{pathname:"/",state:{displaySuccessAlert:!0}}}):Object(f.jsxs)(r.a.Fragment,{children:[Object(f.jsx)(I,{display:this.state.showLoad,children:Object(f.jsx)(I.Body,{children:Object(f.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-evenly",height:"inherit"},children:[Object(f.jsx)(F.a,{animation:"border",role:"status"}),Object(f.jsx)("p",{children:"Please Wait..."})]})})}),Object(f.jsxs)("div",{className:"form-container m-350",children:[Object(f.jsx)("h1",{className:"app-name",children:"Register"}),Object(f.jsx)("hr",{class:"line"}),Object(f.jsxs)(d.a,{children:[Object(f.jsxs)(d.a.Group,{controlId:"data",children:[Object(f.jsx)(d.a.Control,{placeholder:"Enter username...",className:"login-input thin-border",onChange:function(t){return e.recordValue(t.target.value,"username")}}),Object(f.jsx)(d.a.Control,{placeholder:"Enter email...",type:"email",className:"login-input thin-border",onChange:function(t){return e.recordValue(t.target.value,"email")}}),Object(f.jsx)(d.a.Control,{placeholder:"Enter password...",type:"password",className:"login-input thin-border",onChange:function(t){return e.recordValue(t.target.value,"password")}}),Object(f.jsx)(d.a.Control,{placeholder:"Confirm password...",type:"password",className:"login-input thin-border",onChange:function(t){return e.recordValue(t.target.value,"confirmPassword")}})]}),Object(f.jsx)(u.a,{className:"button",variant:"primary",type:"submit",onClick:this.handleSubmit,children:"Register"}),this.state.alertusername&&Object(f.jsx)(p.a,{variant:"warning",style:{"margin-top":"10px"},children:this.state.alertusername}),this.state.alertemail&&Object(f.jsx)(p.a,{variant:"warning",style:{"margin-top":"10px"},children:this.state.alertemail}),this.state.alertpassword&&Object(f.jsx)(p.a,{variant:"warning",style:{"margin-top":"10px"},children:this.state.alertpassword}),this.state.alertconfirmPassword&&Object(f.jsx)(p.a,{variant:"warning",style:{"margin-top":"10px"},children:this.state.alertconfirmPassword})]})]})]})}}]),n}(r.a.Component));function M(e){var t=x();return console.log(t),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)("h1",{children:[" Welcome to PhotoShare ",t.user.username]}),Object(f.jsx)(u.a,{onClick:function(){return t.signout()},children:"Logout"})]})}var D=n(54);function V(e){var t=e.children,n=Object(D.a)(e,["children"]),a=x();Object(j.h)();return Object(f.jsx)(j.b,Object(i.a)(Object(i.a)({},n),{},{render:function(e){var n=e.location;return a.user.access_token?t:Object(f.jsx)(j.a,{to:{pathname:"/",state:{from:n}}})}}))}function A(){return Object(f.jsx)(g,{children:Object(f.jsx)(h.a,{children:Object(f.jsxs)(j.d,{children:[Object(f.jsx)(j.b,{exact:!0,path:"/",children:Object(f.jsx)(T,{})}),Object(f.jsx)(j.b,{path:"/register",children:Object(f.jsx)(_,{})}),Object(f.jsx)(V,{path:"/feed",children:Object(f.jsx)(M,{})})]})})})}var R=function(){return Object(f.jsx)("div",{children:Object(f.jsx)(A,{})})},W=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,95)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,o=t.getTTFB;n(e),a(e),r(e),s(e),o(e)}))};o.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(R,{})}),document.getElementById("root")),W()}},[[91,1,2]]]);
//# sourceMappingURL=main.a9e39917.chunk.js.map