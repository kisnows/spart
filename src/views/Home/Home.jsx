import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, Cells, Cell, CellHeader, CellFooter, CellBody, Input, Select, Button } from 'ne-rc'
import { showToast } from '../../store/actions/ui'
import { init, formChange } from './HomeAction'
import validate from '../../config/validate'
import lang from '../../config/lang'

class Home extends Component {
  constructor (...props) {
    super(...props)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.props.init()
    setTimeout(() => {
      this.props.formChange({
        data: {
          name: {
            value: '123'
          },
          phone: {},
          gender: {}
        }
      })
    }, 2000)
  }
  handleFieldChange (fieldData) {
    console.log('fieldChange', fieldData)
  }
  handleFormChange (formData) {
    this.props.formChange(formData)
  }

  handleSubmit (isValidate, formData, pureData) {
    if (!isValidate) {
      return this.props.showToast(formData.errorMsgList[0])
    } else {
      console.log(formData, pureData)
    }
  }

  render () {
    const genderList = [{
      name: '男',
      value: 1,
      disabled: true
    }, {
      name: '女',
      value: 0
    }, {
      name: '中性',
      value: 2
    }]
    const {isComplete, data} = this.props.pageData
    const {name, phone, gender} = data
    return (
      <section className='page_Home'>
        <Form
          onChange={this.handleFormChange}
          onFieldChange={this.handleFieldChange}
          onSubmit={this.handleSubmit}
        >
          <Cells>
            <Cell warning={name.isError}>
              <CellHeader >名字</CellHeader>
              <CellBody>
                <Input
                  name={'name'}
                  type={'text'}
                  value={name.value}
                  placeholder='请输入姓名'
                  validate={validate.name}
                  errorMsg={lang.nameErrorMsg}
                />
              </CellBody>
            </Cell>
            <Cell warning={phone.isError}>
              <CellHeader >手机号</CellHeader>
              <CellBody>
                <Input
                  name={'phone'}
                  type={'number'}
                  placeholder='请输入13位手机号'
                  validate={validate.phone}
                  errorMsg={lang.phoneErrorMsg}
                  value={phone.value}
                />
              </CellBody>
            </Cell>
            <Cell>
              <CellHeader >性别</CellHeader>
              <CellBody><Select name={'gender'} data={genderList} value={gender.value} /></CellBody>
            </Cell>
          </Cells>
          <Button type='submit' disabled={!isComplete}>提交</Button>
        </Form>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    pageData: state.home
  }
}

const mapDispatchToProps = {
  init,
  showToast,
  formChange
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
