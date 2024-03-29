//return an html signature for a user

module.exports = function generateSignature(user) {

var signature = "";
  signature += '<table border="1" cellspacing="0" cellpadding="0" style="font-size:small;border-collapse:collapse;border:none">';
  signature +=  '<tbody>';
  signature += '<tr>';
  signature += '<td width="113" valign="top" style="width:84.8pt;border-style:none solid none none;border-right-color:windowtext;border-right-width:1pt;padding:0cm 5.4pt">'
  signature += '<p style="margin-bottom:0.0001pt"></p>'
  signature += '<div style="text-align:center">'
  signature += '<span style="font-family:Lato,sans-serif;font-size:12.8px">&nbsp; &nbsp; &nbsp;As seen in...</span>'
  signature += '</div>'
  signature += '<div style="text-align:center">'
  signature += '<a href="http://www.forbes.com/sites/edmundingham/2015/01/23/london-dubai-germany-global-m-recruitment-is-making-socially-responsible-recruiting-the-norm/" style="color:rgb(17,85,204)" target="_blank">'
  signature += '<img src="https://ci5.googleusercontent.com/proxy/dstOCDocN_spXImmd8Hkc9GvyVuXxqzg5BY6dHP3UdRo2LzTDzbkEvKh7SiqMhG9ayVoAIqlsvwgtmx85mVU0jUT5nk02ndh6M6uCeI8r5AWKWAqhyvPo0K5Gnw_ww=s0-d-e1-ft#http://www.global-m.co.uk/wp-content/uploads/2015/01/Forbes_logo_sig.png" class="CToWUd">'
  signature += '</a><br>'
  signature += '</div>'
  signature += '<div style="text-align:center">'
  signature += '<a href="http://www.haggerston-times.com/company-profile-global-m-organic-recruitment-agency-set-to-become-tech-incubator/" style="color:rgb(17,85,204)" target="_blank">'
  signature += '<img src="https://ci6.googleusercontent.com/proxy/iIk6O-So9_vWpgSZ5FmhLMxFEJ-X-5NYAaSDp7esMdDrz2zA-_ZGV97hv7xAYNSFrvavKp42ZAhFtagzoO3o67lYN9J57OHfj83JDpHluqkGkUW_P6x1eyWm1ylg0IDv_EZFbvenww=s0-d-e1-ft#http://www.global-m.co.uk/wp-content/uploads/2015/01/HaggerstonTimesSignature.png" style="font-size:12.8px" class="CToWUd">'
  signature += '</a>'
  signature += '</div>'
  signature += '<div style="text-align:center">'
  signature += '<a href="http://www.entrepreneurcountryglobal.com/united-kingdom/ecosystem-economics/item/gmr" style="color:rgb(17,85,204)" target="_blank">'
  signature += '<img src="https://ci4.googleusercontent.com/proxy/WbI8TVPDCE4WQDgup5oFLLtRMiEvTtvpA2XDlCTJv07R-PmQdlVjoJZReZHSt6D9ncgw17XHPwDlziI7axz3fAm-3oEARL0LEVlNuxIDY4wVYAnPSTx7x6hqP1-LCahvj7SPzeFZJMRZK0I5dA=s0-d-e1-ft#http://www.global-m.co.uk/wp-content/uploads/2015/01/Entrepreneur-Country-Signature.png" style="font-size:12.8px" class="CToWUd">'
  signature += '</a>'
  signature += '</div>'
  signature += '<p></p>'
  signature += '</td>'
  signature += '<td width="274" valign="top" style="width:205.55pt;border:none;padding:0cm 5.4pt">'
  signature += '<p style="margin-bottom:0.0001pt">'
  signature += '<span style="font-size:14pt"><font face="arial, helvetica, sans-serif"><font color="#999999">' + user.fn + '</font><br></font></span>'
  signature += '<span style="color:rgb(153,153,153)"><font size="4" face="arial, helvetica, sans-serif">' + user.role+ '</font><br></span>'
  signature += '<b><span style="font-size:9.5pt;font-family:Arial,sans-serif"><font color="#93c47d">t</font></span></b>'
  signature += '<span style="color:rgb(153,153,153);font-size:9.5pt;font-family:Arial,sans-serif">:' + user.office + '&nbsp;</span>'
  signature += '<b><span style="font-size:9.5pt;font-family:Arial,sans-serif"><font color="#93c47d">m</font></span></b>'
  signature += '<span style="font-size:9.5pt;font-family:Arial,sans-serif"><font color="#999999">:' + user.mobile + '<br></font>'
  signature += '<br>'
  signature += '<a href="http://www.global-m.co.uk/" style="color:rgb(17,85,204)" target="_blank">'
  signature += '<img width="96" height="22" src="https://ci5.googleusercontent.com/proxy/g1JxPqGLvPRF0HiToEMtpNe7VQW-LWMzLuT2UPHpA-O_s3yjfTTffnZmLqvT2yiCC6_xoZv1FcnbkIpORk5JJEjAH7sO5mT1hFtCJzF8yQ=s0-d-e1-ft#http://global-m.co.uk/wp-content/uploads/2014/08/logo.png" style="font-family:arial,sans-serif;font-size:12.8px" class="CToWUd">'
  signature += '</a>'
  signature += '<br>'
  signature += '</span>'
  signature += '</p>'
  signature += '<p style="margin-bottom:0.0001pt">'
  signature += '<b><span style="font-size:9.5pt;font-family:Arial,sans-serif"><font color="#999999">Connect with us</font><br></span></b>'
  signature += '<a href="https://twitter.com/Global_M_" style="color:rgb(17,85,204)" target="_blank"><img alt="" src="https://ci4.googleusercontent.com/proxy/hSJpBqV27JrVTLf7ahEZOhp5EpUFXwuqf0g43n98CkEigkYiCv6iJWaWaVZ0I47gnu6xkFt09TFwWOnzu_RO_t80IrG03kCBwjwarYTvfu2YxLUfT8cNxjqwHg=s0-d-e1-ft#http://www.global-m.co.uk/wp-content/uploads/2014/08/twitteremail.png" class="CToWUd"></a>&nbsp;'
  signature += '<a href="' + user.linkedin +'" style="color:rgb(17,85,204)" target="_blank">'
  signature += '<img alt="" src="https://ci4.googleusercontent.com/proxy/TbE9lK-iVn3zUlsTLPnxFm0NS_RpNgOa4wPfFFJe1INrtlhI7T0fDEVwLHrojGyqK0B-vE8ggE2JWd5992HSKUw_irGqsdS5v0MEvOKVVUlQAYuXs45NT0F_GemN=s0-d-e1-ft#http://www.global-m.co.uk/wp-content/uploads/2014/08/Linkedin-icon1.png" class="CToWUd">'
  signature +=  '</a>&nbsp;'
  signature +=  '<a href="https://www.facebook.com/GlobalMethod" style="color:rgb(17,85,204)" target="_blank">'
  signature +=  ' <img src="https://ci4.googleusercontent.com/proxy/aYuYSsqcoY246-qNtl4vf-x4wIRKY3yUZmJsCqT48upkL2zaf_Lg5mBu_uv0fsO7y7YO4J1XictiOJlE9hmo8oxCHyHCEXQQEA9PDrpMV8eMoYmvhy4zYs1TJ6gV=s0-d-e1-ft#http://www.global-m.co.uk/wp-content/uploads/2014/08/facebook-icon1.png" class="CToWUd">'
  signature +=  '</a>&nbsp;'
  signature +=  '<a href="https://plus.google.com/+Global-markets-recruitment" style="color:rgb(17,85,204)" target="_blank">'
  signature +=  '<img src="https://ci3.googleusercontent.com/proxy/8aEWIr0bnyxbH9FtvNFTTnqznoBsO9JtEF6Ynaqf03KE91lNLXfO7ugHK60ih95g_A9oKRXk_WwXJrCbEuI44g2GYawZp92UNW7eMeOeWLnN2u12l-FxOHNhtoEbgFYH=s0-d-e1-ft#http://www.global-m.co.uk/wp-content/uploads/2014/08/Google-Plus-icon1.png" class="CToWUd">'
  signature +=  '</a>'
  signature +=  '</p>'
  signature +=  '</td>'
  signature +=  '</tr>'
  signature +=  '</tbody>'
  signature += '</table>'

  return signature;
}
