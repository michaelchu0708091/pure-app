import React, { Component } from 'react';
// import './htmlContent.scss';
const DOMPurify = require('dompurify')(window);
const nl2br = (str, is_xhtml = true) => {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
class HtmlContent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { content } = this.props;
        return (
            <div className="htmlContentWrapper" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(nl2br(content)) }}></div>
        );
    }
}

export default HtmlContent;