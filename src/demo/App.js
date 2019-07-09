import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TextareaAutosize from 'react-autosize-textarea';
import {
  Segment,
  Header,
  Container,
  Form,
  Dropdown,
  Button,
} from 'semantic-ui-react';
import { RRule } from 'rrule';

import ReactRRuleGenerator, { translations } from '../lib';
import './index.css';
import githubLogo from './github_logo.png';

const rruleDayMap = {
  1: RRule.MO,
  2: RRule.TU,
  3: RRule.WE,
  4: RRule.TH,
  5: RRule.FR,
  6: RRule.SA,
  7: RRule.SU,
};

const rrule = new RRule({
  freq: RRule.WEEKLY,
  interval: 1,
  byweekday: [rruleDayMap[(new Date()).getDay()]],
});

class App extends Component {
  state = {
    rrule: rrule.toString(),
    isCopied: false,
    language: 'en',
  };

  getTranslation = () => ((this.state.language === 'de') ? translations.german : undefined);

  handleChangeLanguage = (event) => {
    const newLanguage = event.target.value;
    this.setState({ language: newLanguage });
  };

  handleChange = (newRRule) => {
    this.setState({ rrule: newRRule, isCopied: false });
  };

  handleCopy = () => {
    this.setState({ isCopied: true });
  };

  render() {
    const { rrule, isCopied } = this.state;

    return (
      <div>
        <div className="app-navbar">
          <a href="https://github.com/fafruch/react-rrule-generator">
            &lt; go back to
            {' '}
            <img className="app-navbar-ghlogo" src={githubLogo} alt="Github logo" />
            /fafruch
          </a>

          <iframe
            title="github-star"
            src="https://ghbtns.com/github-btn.html?user=fafruch&repo=react-rrule-generator&type=star&count=true&size=medium"
            frameBorder="0"
            scrolling="0"
            width="78px"
            height="20px"
          />
        </div>
        <div className="app-header">
          <h1>React RRule Generator</h1>
        </div>

        <div className="app-desc">
          Recurrence rules generator form built with React
        </div>

        <Container>
          <span />
          <Header as="h5">{'<RRuleGenerator />'}</Header>

          <ReactRRuleGenerator
            onChange={this.handleChange}
            value={this.state.rrule}
            config={{
              hideStart: false,
              relativeDate: new Date(),
            }}
            translations={this.getTranslation()}
          />
        </Container>

        <Container>
          <span />
          <Header as="h5">Example handling</Header>
          <Segment>
            <Form>
              <Form.Field
                inline
                label="RRule"
                control={() => (
                  <TextareaAutosize
                    className={`form-control rrule ${isCopied ? 'rrule-copied' : 'rrule-not-copied'}`}
                    value={rrule}
                    readOnly
                  />
                )}
              />

              <CopyToClipboard
                text={rrule}
                onCopy={this.handleCopy}
              >
                <Button
                  aria-label="Copy generated RRule"
                  primary={isCopied}
                >
                  {isCopied ? 'Copied' : 'Copy'}
                </Button>
              </CopyToClipboard>
            </Form>
          </Segment>

          <Header as="h5">Config</Header>
          <Segment>
            <Form>
              <Form.Group>
                <Form.Field
                  inline
                  label="Language"
                  control={() => (
                    <Dropdown
                      value={this.state.language}
                      onChange={(e, { value }) => this.handleChangeLanguage({ target: { value: value } })}
                      options={[
                        { text: 'English', value: 'en' },
                        { text: 'German', value: 'de' },
                      ]}
                      selection
                    />
                  )}
                />
              </Form.Group>
            </Form>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default App;
