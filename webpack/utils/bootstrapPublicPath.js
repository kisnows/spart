/**
 * Created by kisnows on 2017/2/13.
 * 用来解决因为 css-loader 开启 sourceMap 导致 css background 中图片引用地址为相对路径造成的图片不显示的问题。
 */
/* eslint-disable */
__webpack_public_path__ = window.location.protocol + '//' + window.location.host + '/'
