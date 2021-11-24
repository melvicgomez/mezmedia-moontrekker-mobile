import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/Theme';
import AppBarComponent from '@/Components/AppBarComponent';
import { Table, Row, Rows } from 'react-native-table-component';

function IndexTermsAndConditionsContainer() {
  const { Fonts, Gutters, Layout, Colors } = useTheme();

  const definitionTable = {
    tableHead: ['Term', 'Definition'],
    tableData: [
      [
        'MoonTrekker ',
        'The name of the online platform, in either mobile app or desktop web browser format.',
      ],
      ['User(s)', 'Participants who have signed up to MoonTrekker'],
      [
        'User Content',
        'Any information, data, text, software, sound, photographs, graphics, video, messages, posts, tags, or other materials you make available on the MoonTrekker platform.',
      ],
    ],
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent
        title="TERMS & CONDITIONS"
        type="main"
        displayBack={true}
      />
      <ScrollView bounces={false}>
        <View
          style={[
            Gutters.regularTPadding,
            Gutters.regularHPadding,
            Gutters.largeBPadding,
          ]}
        >
          <View>
            <Text
              style={[
                Fonts.h2,
                Gutters.regularTMargin,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              MOONTREKKER TERMS AND CONDITIONS
            </Text>
            <Text
              style={[
                Fonts.bodyBold,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              These are the Terms and Conditions of access to the MoonTrekker
              online platform (“MoonTrekker”), developed by MoonTrekker Ltd,
              with its registered office at 16/F, Shing Lee Commercial Building,
              8 Wing Kut Street, Central, Hong Kong (in this document referred
              to as “MoonTrekker Ltd”, “we” or “us”) for Asia Pacific Employees
              of Barclays Bank PLC and its affiliates (in this document referred
              to as “users”, “Barclays employees” or “you”).
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              Your use of MoonTrekker and any interaction with any content or
              activity through MoonTrekker will be subject to these Terms and
              Conditions and by using MoonTrekker you agree to be bound by them.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              MoonTrekker Ltd may need to update these Terms and Conditions from
              time to time to accurately reflect our offerings and practices.
              Subject to prior notice, MoonTrekker Ltd reserve the right to
              change these Terms and Conditions by changing them on the
              MoonTrekker platform. Your continued access to MoonTrekker ,
              subsequent to any updates, shall be deemed as your agreement and
              binding acceptance of the updated Terms and Conditions.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              MoonTrekker Ltd may restrict or block your access to and use of
              the MoonTrekker platform at any time if MoonTrekker Ltd reasonably
              believes that you may have breached these Terms and Conditions and
              all rights granted to you under these Terms and Conditions will
              terminate immediately in the event that you are in breach hereof.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              These Terms and Conditions were last updated on [5 September
              2021].
            </Text>
            <Text
              style={[
                Fonts.h2,
                Gutters.regularTMargin,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              MoonTrekker OVERVIEW
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              MoonTrekker is an online platform, designed, developed and
              delivered to engage, connect, motivate and incentivize MoonTrekker
              users in Hong Kong. The MoonTrekker is accessible by mobile app
              and desktop web browser.
            </Text>
            <Text
              style={[
                Fonts.h2,
                Gutters.regularTMargin,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              DEFINITIONS
            </Text>
            <View
              style={{
                flex: 1,
                padding: 5,
                paddingTop: 10,
              }}
            >
              <Table
                borderStyle={{ borderWidth: 2, borderColor: Colors.white }}
              >
                <Row
                  data={definitionTable.tableHead}
                  style={{ height: 40, backgroundColor: Colors.lightGrey }}
                  textStyle={[Fonts.h3, { margin: 5 }]}
                />
                <Rows
                  data={definitionTable.tableData}
                  textStyle={[Fonts.body, { margin: 5, color: Colors.white }]}
                />
              </Table>
            </View>
            <Text
              style={[
                Fonts.h2,
                Gutters.largeTMargin,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              PLATFORM ACCESS
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              It is your responsibility to ensure your equipment (computer,
              laptop, notebook, tablet or other mobile device) meets all the
              necessary technical specifications to enable you to access and use
              MoonTrekker.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              To use MoonTrekker, you must register. Access to MoonTrekker is
              for paid users only. Only those registered to use the platform can
              access, engage and consume any content through the MoonTrekker
              platform.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              You are responsible for maintaining the confidentiality of the
              password associated with your account to ensure no one but you
              logs into your account and uses the platform. You accept
              responsibility for all activities that occur under your account
              through either the desktop web browser or the mobile app.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              MoonTrekker Ltd will use appropriate technical, organisational and
              security measures to provide protection against unauthorized
              access to your account. MoonTrekker Ltd cannot, however, guarantee
              absolute security of your account or the personal information you
              provide. To the extent permitted by law, MoonTrekker Ltd does not
              accept any liability in respect of third-party “hackers” illegally
              accessing your account or the MoonTrekker platform and any content
              or information sitting within it unless such liability arose from
              our failure to comply with applicable Data Protection legislation.
              You agree to immediately notify MoonTrekker Ltd of any
              unauthorized use of your account or password, or any other breach
              of security immediately in the instance it occurs.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              We cannot guarantee the continuous, uninterrupted or error-free
              operability of MoonTrekker, there may be times when certain
              features, content and/or parts of MoonTrekker become temporarily
              or permanently unavailable (scheduled or unscheduled) or are
              modified, suspended or withdrawn by us, in our sole discretion,
              without notice. You agree that MoonTrekker Ltd are not liable to
              you or any third party for any loss or damage (including direct,
              indirect loss, or special or consequential loss) arising from any
              unavailability, disruptions, defects, technical errors, suspension
              or withdrawal of content on any parts of MoonTrekker that may
              occur at any time and from time to time.
            </Text>
            <Text
              style={[
                Fonts.h2,
                Gutters.regularTMargin,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              PLATFORM USAGE
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              You represent and warrant that: (i) you are authorised to create
              your account;
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              MoonTrekker Ltd accepts no liability for any Challenges, Training
              or Race on the MoonTrekker platform, or any loss or damage of any
              kind incurred as a result of these, unless the loss or damage
              resulted from our gross negligence, wilful misconduct, or breach
              of applicable laws. You agree to bear all risks associated with
              your use of any Challenges, Training or Race available in
              connection with the MoonTrekker platform, including any reliance
              on the accuracy, completeness, or usefulness of these. MoonTrekker
              Ltd is not liable in any way for the content provided by any third
              party, nor their actions.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              You accept that you are entirely responsible for all User Content
              that you upload, post, transmit or otherwise make available
              through MoonTrekker. Just Challenge does not guarantee the
              accuracy, integrity or quality of any User Content on the
              MoonTrekker platform. Just Challenge may, in its sole discretion,
              screen, monitor, hide, refuse or remove any User Content that is
              considered objectionable.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              You may only use MoonTrekker for non-commercial and lawful
              (complying with all applicable laws and regulations) use in
              accordance with these Terms and Conditions. You agree to not
              modify, copy, distribute, transmit, display, perform, reproduce,
              publish, license, create derivative works from, transfer or sell
              for any commercial purposes, anything available through
              MoonTrekker. You agree that you will not, nor will you assist or
              encourage any other party to, engage in any of the following
              prohibited activities:
            </Text>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                1.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Copy, frame or mirror any part of MoonTrekker;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                2.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Permit any unauthorised third party to access MoonTrekker;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                3.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Use, copy, modify, create a derivative work of, reverse
                engineer, decompile or otherwise attempt to extract the source
                code of the software underlying MoonTrekker or any part thereof,
                unless expressly permitted or required by law, and in any case,
                without providing prior written notice to MoonTrekker Ltd;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                4.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Publish, transmit, distribute or store content, material,
                information or data that: (1) is illegal, obscene, defamatory,
                threatening, harassing, abusive, or hateful or that advocates
                violence; (2) is harmful to or interferes with MoonTrekker or
                any third party’s networks, equipment, applications, services or
                websites (e.g., viruses, worms, Trojan horses, etc.); (3)
                infringes, dilutes, misappropriates or otherwise violates any
                privacy, intellectual property, publicity or other personal
                rights including, without limitation, copyrights, patents,
                trademarks, trade secrets or other proprietary information
                (including unauthorized use of domain names); or (4) is
                fraudulent or contains false, deceptive or misleading
                statements, claims or representations (such as “phishing”);
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                5.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Attempt to disrupt, degrade, impair or violate the integrity or
                security of MoonTrekker or the computers, services, Accounts or
                networks of any other party (including, without limitation,
                “hacking,” “denial of service” attacks, etc.), including any
                activity that typically precedes attempts to breach security
                such as scanning, probing or other testing or vulnerability
                assessment activity, or engaging in or permitting any network or
                hosting activity that results in the blacklisting or other
                blockage of MoonTrekker internet protocol space;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                6.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Distribute, or disclose any part of MoonTrekker in any medium,
                including without limitation by any automated or non-automated
                “scraping”;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                7.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Take any action that imposes, or may impose, at our sole
                discretion, an unreasonable or disproportionately large load on
                our infrastructure;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                8.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Collect or harvest any information relating to an identified or
                identifiable individual, including account names and information
                about users of MoonTrekker , from MoonTrekker;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                9.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Submit to the MoonTrekker or MoonTrekker Ltd any information
                that may be protected from disclosure by applicable law;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                10.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Bypass the measures we may use to prevent or restrict access to
                MoonTrekker, including, without limitation, features that
                prevent or restrict use or copying of any content or enforce
                limitations on use of MoonTrekker or the content therein;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                11.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Violate any applicable law, statute, ordinance or regulation, or
                encourage any conduct that could constitute a criminal offense
                or give rise to civil liability;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                12.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Remove any copyright, trademark or other proprietary rights
                notices contained in or on MoonTrekker; or
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                13.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Execute any form of network monitoring or running a network
                analyser or packet sniffer or other technology to intercept,
                decode, mine or display any packets used to communicate between
                MoonTrekker ’s servers or any data not intended for you.
              </Text>
            </View>

            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              We cannot guarantee that MoonTrekker is free of viruses and/or
              other code that may have contaminating or destructive elements but
              we are utilizing and will continue to utilize the most recent
              version and the most recent data file of a reputable, commercially
              available anti-virus-checking software program to ensure that the
              MoonTrekker platform and our services are free of viruses or
              destructive elements. It is your responsibility to implement
              appropriate IT security (including anti-virus and other security
              checks) to safeguard your system and equipment.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              MoonTrekker may include links to external sites. We include these
              in order to provide you with access to required / additional
              information, products or services that you may find useful or
              interesting. We are not responsible for the content on these
              external sites or anything provided by them; additionally we do
              not guarantee that they will be continuously available. The fact
              that we include links to such external sites also does not imply
              our endorsement of our association with their operators or
              promoters. Please read all copyright and legal notices on each
              linked website before downloading or printing items to ensure that
              you are permitted to do so under the third party site's copyright
              notices, legal notices or terms of use. You maintain full
              responsibility for your dealings with third parties and your use
              of third party websites, applications, products or services.
            </Text>

            <Text
              style={[
                Fonts.h2,
                Gutters.regularTMargin,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              TERMINATION
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              You agree that access to and use of MoonTrekker is not guaranteed
              and MoonTrekker Ltd may, if required under certain circumstances
              and without prior notice, immediately suspend or terminate your
              account and/or access to MoonTrekker. Cause for such suspension or
              termination shall include, but not be limited to:
            </Text>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                1.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Breaching or violating these Terms and Conditions or any other
                incorporated agreements, policies or guidelines that have been
                made known to you;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                2.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Requests by law enforcement or other government agencies;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                3.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                As requested by you - self-initiated account deletion;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                4.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Discontinuance or material modification to MoonTrekker;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                5.
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Unexpected technical, maintenance, operations or security issues
                or problems;
              </Text>
            </View>

            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              Furthermore, you agree that any suspension or termination of your
              account shall be made solely by MoonTrekker Ltd and that
              MoonTrekker Ltd are not liable to you or any third party for any
              suspension or termination of your account or access to
              MoonTrekker.
            </Text>
            <Text
              style={[
                Fonts.h2,
                Gutters.regularTMargin,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              PRIVACY
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              Use of any personal information submitted to or via MoonTrekker is
              governed by our Privacy Policy (please refer to the MoonTrekker
              Ltd Privacy Policy). By using or downloading MoonTrekker, you
              confirm that you agree to these Terms and Conditions and to our
              Privacy Policy. If you do not agree, do not use MoonTrekker. You
              are responsible for ensuring the security of the personal
              information held on your computer, mobile or other device.
            </Text>
            <Text
              style={[
                Fonts.h2,
                Gutters.regularTMargin,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              INDEMNITY
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              You shall indemnify and hold harmless MoonTrekker Ltd and all its
              entities, employees, consultants, agents, representatives,
              partners and licensors against all third party Claims (defined
              herein below) howsoever arising which may be asserted against or
              suffered by us and which relate to your use of MoonTrekker and
              activities undertaken on the platform and/or the breach in the
              security of your computer, mobile or other device or the access to
              any information held on your computer, mobile or other device by
              unauthorised third parties.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              For the purpose of the above paragraph, “Claims” shall mean all
              demands, claim and liability (whether criminal or civil, in
              contact, tort or otherwise) for losses, damages, legal costs and
              other expenses of any nature whatsoever and all costs and expenses
              (including without limitation legal costs) incurred in connection
              therewith.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              To the extent permitted by law, you agree that we will not be
              liable to you in contract, tort, negligence, breach of statutory
              duty or otherwise for any loss, damage, costs, or expenses of any
              nature whatsoever incurred or suffered by you of an indirect or
              consequential nature, including without limitation any economic
              loss or other loss of turnover, profit, business or goodwill.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              To the extent permitted by law, and in circumstances where we have
              not effectively excluded liability to you under or in connection
              with these terms and conditions, you agree that the maximum limit
              of our liability to you whether in contract, tort, negligence,
              breach of statutory duty or otherwise shall not exceed HKD 2,000.
            </Text>

            <Text
              style={[
                Fonts.h2,
                Gutters.regularTMargin,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              INVALIDITY
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              If a provision of these Terms and Conditions is or becomes
              illegal, invalid or unenforceable in any jurisdiction, that does
              not affect:
            </Text>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                -
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                The legality, validity or enforceability in that jurisdiction of
                any other provision of these Terms and Conditions; or
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallHMargin,
                  { color: Colors.white },
                ]}
              >
                -
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                The legality, validity or enforceability in other jurisdictions
                of that or any other provision of these Terms and Conditions.
              </Text>
            </View>

            <Text
              style={[
                Fonts.h2,
                Gutters.regularTMargin,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              GOVERNING LAW AND JURISDICTION
            </Text>

            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              These terms and conditions and any disputes or claims or other
              matters arising out of or in connection with MoonTrekker and these
              Terms and Conditions shall be governed by and construed in
              accordance with the laws of Hong Kong without regard to any
              principles governing conflicts of laws that would result in the
              application of the law of a different jurisdiction. You further
              irrevocably agree that the courts of Hong Kong shall have
              exclusive jurisdiction to hear and settle any dispute or claim
              that arises out of or in connection with these terms and
              conditions and MoonTrekker.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default IndexTermsAndConditionsContainer;
