import React from 'react';
import { View, Text, ScrollView, PixelRatio } from 'react-native';
import { useTheme } from '@/Theme';
import AppBarComponent from '@/Components/AppBarComponent';

function IndexPrivacyPolicyContainer() {
  const { Fonts, Gutters, Layout, Colors } = useTheme();

  const textStyle = {
    bodyText: {
      color: Colors.white,
      lineHeight: 24 / PixelRatio.getFontScale(),
    },
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent title="PRIVACY POLICY" type="main" displayBack={true} />
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
              MoonTrekker PRIVACY AND COOKIES POLICY
            </Text>
            <Text
              style={[
                Fonts.bodyBold,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              This is the Privacy Policy for the MoonTrekker online platform
              (“MoonTrekker”), developed by MoonTrekker Ltd, with its registered
              office at 16/F, Shing Lee Commercial Building, 8 Wing Kut Street,
              Central, Hong Kong (in this document referred to as “Platform
              Provider”, “we” or “us”).
            </Text>

            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              This Privacy Policy <Text style={Fonts.bodyBold}>(“Policy”)</Text>{' '}
              sets out:
            </Text>
            <Text style={[Fonts.body, { color: Colors.white }]}>
              (1) The information collected about you when you visit and use
              MoonTrekker and/or otherwise interact with us;
            </Text>

            <Text style={[Fonts.body, { color: Colors.white }]}>
              (2) How data is collected;
            </Text>

            <Text style={[Fonts.body, { color: Colors.white }]}>
              (3) How data is used, shared, stored, and secured; and
            </Text>

            <Text
              style={[
                Fonts.body,
                Gutters.regularBMargin,
                { color: Colors.white },
              ]}
            >
              (4) How you may access and control the information.
            </Text>

            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              MoonTrekker is an online platform, designed to engage, connect,
              motivate and incentivise MoonTrekker users in Hong Kong.
              MoonTrekker is accessible by mobile app and desktop web browser.
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              This Policy explains what data is collected about you through
              MoonTrekker and how it is stored, analysed and shared. This Policy
              applies to all personal information whether collected online or
              offline. This Policy also explains your rights with regards to
              your data, and how to contact us to request access, corrections,
              transfer, restriction or deletion of the data collected about you.
            </Text>

            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              If you do not agree with our policies and practices contained in
              this Policy, please do not register or engage with MoonTrekker.
              Interaction with any content or activity through MoonTrekker will
              be deemed as your agreement and binding acceptance of the terms
              and conditions of this Policy.
            </Text>

            <Text
              style={[
                Fonts.body,
                Gutters.mediumBMargin,
                { color: Colors.white },
              ]}
            >
              In this Policy,{' '}
              <Text style={Fonts.bodyBold}>“Personal Information” </Text>refers
              to any personal data, information, or combination of data and
              information that is provided by you to us, or through your use of
              our products or services, that relates to an identifiable
              individual.
            </Text>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                1
              </Text>
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                What information MoonTrekker collects about you
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                1.1
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                The following information will be collected about you through
                MoonTrekker:
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                Profile information that you provide when you register for an
                account or sign up for our products or services, for example
                your name, username or similar identifier, other personal
                description, date of birth, age and gender, email address,
                address and phone number (collectively,{' '}
                <Text style={Fonts.bodyBold}>“Account Data”</Text>).{' '}
                <Text style={Fonts.bodyBold}>“Account Data”</Text> is also used
                by the Platform Provider to create your user account, verify
                your identity or to get in touch with you about your account if
                needed.
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                Activity data uploaded to the platform shared via the users
                personal linked Fitness App account{' '}
                <Text style={Fonts.bodyBold}>(“Activity Data”)</Text> .
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.regularLMargin,
                  Gutters.tinyRMargin,
                  { color: Colors.white },
                ]}
              >
                •
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                This includes, but is not limited to:
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.largeLMargin,
                  Gutters.tinyRMargin,
                  { color: Colors.white },
                ]}
              >
                •
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                activity (including date, time and geo-location information as
                well as your speed and pace and perceived exertion);
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.largeLMargin,
                  Gutters.tinyRMargin,
                  { color: Colors.white },
                ]}
              >
                •
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                photos, posts, comments and contributions, kudos, ratings,
                survey results, reviews;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.largeLMargin,
                  Gutters.tinyRMargin,
                  { color: Colors.white },
                ]}
              >
                •
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                equipment usage.
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                Content you provide through use of MoonTrekker or associated
                third party social channels, for example “blog posts, comments,
                discussion forums, chats, reviews, photos, images”
                (collectively,
                <Text style={Fonts.bodyBold}> “User Content”</Text> ).
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                Communication, marketing, and other preferences that you set
                when you set up your account or profile, or when you participate
                in a survey or a questionnaire (collectively,{' '}
                <Text style={Fonts.bodyBold}> “Preference Data”</Text>). The
                Platform Provider maintains records of any communications, via
                email or our support desks, to help resolve your customer
                service enquiries.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                Information about your activity and interaction with MoonTrekker{' '}
                <Text style={Fonts.bodyBold}>(“Usage Data”)</Text>, such as your
                device type, browser type and IP address. This information is
                used to help assess the performance of MoonTrekker, or assist
                you with support requests. This will be periodically accessed
                for experience optimisation.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                Information about your device or connection, for example “your
                internet protocol (IP) address, location information, log-in
                data, browser type and version, time-zone setting, browser
                plug-in types and versions, operating system and platform, and
                other technology on the devices you use to access our products
                or services” and information collected through cookies and other
                data collection technologies (collectively,{' '}
                <Text style={Fonts.bodyBold}>“Technical Data”</Text>).
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                1.2
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Sensitive data or special category data is not collected. This
                includes details about your race, ethnic origin, politics,
                religion, trade union membership, genetics or sexual
                orientation.
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                2
              </Text>
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                How your personal information and data is used and shared
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                2.1
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Personal information is used, disclosed and/or shared as below:
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                To carry on business and operate MoonTrekker, to improve our
                products and services, to provide customer support and
                personalised features, administer your account membership, and
                to protect the safety and security of MoonTrekker;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                With our and the Platform Provider’s other entities, trusted
                third parties and service providers including (without
                limitation) print service providers, call centres and mail
                houses, advisors, advertising agencies, accountants, auditors
                and lawyers for data processing, analysis, back-up and storage,
                information broking, research, investigation, website
                application development and technology services, infrastructure,
                customer support, business analytics, and other related
                services;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                To satisfy a legitimate interest which is not overridden by your
                fundamental rights or data protection interests, for example for
                research and development, and in order to protect legal rights
                and interests;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                To publish your information as part of testimonials, social
                posts, or customer stories to promote the Platform Provider’s
                products or services, only where you have given consent to do so
                for this specific purpose;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                When legally required to do so by so by governments, tribunals,
                law enforcement and regulatory agencies (for example as part of
                an ongoing investigation, subpoena, similar legal process or
                proceeding) and/or to comply with a legal or regulatory
                obligation;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                If MoonTrekker or Platform Provider is acquired by a third party
                as a result of a merger, acquisition, or business transfer, your
                personal information may be disclosed and/or transferred to a
                third party in connection with such transaction; or
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
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
                Use your personal information to create{' '}
                <Text style={Fonts.bodyBold}>“Anonymous Data” </Text> records by
                removing any information (including any contact information)
                that would allow the remaining data to be linked back to you.
                Anonymous Data maybe used for internal purposes, such as
                analysing patterns and programme usage to improve our services.
                Additionally, we may use Anonymous Data to analyze and
                understand demographic trends, customer behaviour patterns and
                preferences, and information that can help enrich the content
                and quality of MoonTrekker.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                2.2
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                If you have given consent to use your personal information for a
                specific purpose, you have the right to withdraw your consent
                any time by contacting us, but please note this will not affect
                any use of your information that has already taken place.
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                3
              </Text>
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Third party software, links or websites
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                3.1
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                If you use any third-party software in connection with our
                products or services, for example any third-party software that{' '}
                <Text style={Fonts.bodyBold}>MoonTrekker</Text> integrates with,
                you might give the third-party software provider access to your
                account and information. Policies and procedures of third-party
                software providers are not controlled by us or the Platform
                Provider, and this Policy does not cover how your information is
                collected or used by third-party software providers. You are
                encouraged to review the privacy policies of third-party
                software providers before you use the third-party software.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                3.2
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                MoonTrekker may contain links to third-party websites over which
                the Platform Provider has no control. If you follow a link to
                any of these websites or submit information to them, your
                information will be governed by their policies. We do not
                endorse any third-party sites or their content and we have no
                control over the conduct of the companies or organisations
                operating those sites. You are encouraged to review the privacy
                policies of third-party websites before you submit information
                to them.
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                4
              </Text>
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                How information is stored and protected
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                4.1.1
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                MoonTrekker <Text style={Fonts.bodyBold}>and the</Text> Platform
                Provider are responsible for hosting and securing data and takes
                every step to protect your information and do this in the
                following ways:
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallRMargin,
                  Gutters.regularLMargin,
                  { color: Colors.white },
                ]}
              >
                a)
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                encrypting your password at login stage on MoonTrekker;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallRMargin,
                  Gutters.regularLMargin,
                  { color: Colors.white },
                ]}
              >
                b)
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                retaining your information only for as long as needed to provide
                the services across MoonTrekker;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  Gutters.smallRMargin,
                  Gutters.regularLMargin,
                  { color: Colors.white },
                ]}
              >
                c)
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.smallBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                location information that you submit through our services will
                be stored in Singapore, but may be transferred to third parties
                outside of this location;
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  Gutters.regularLMargin,
                  { color: Colors.white },
                ]}
              >
                d)
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                modification information that you have stored on MoonTrekker can
                be modified or deleted by visiting MoonTrekker.
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                5
              </Text>
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Your rights
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                5.1
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                You have the right to:
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
                5.1.1
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                be informed of what is being done with your personal
                information;
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
                5.1.2
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                request a copy of the readily retrievable personal information
                held about you by us;
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
                5.1.3
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                request amendment or correction to any inaccuracy,
                incompleteness or error in any readily retrievable personal
                information held about you by us (you may be required to produce
                supporting documents to verify the accuracy of the new personal
                information which you provide). If we think the correction is
                reasonable and we are reasonably able to change the personal
                information, we will make the correction. If we do not make the
                correction, we will take reasonable steps to note on the
                personal information that you requested the correction;
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
                5.1.4
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                request erasure of your personal information by us (note, this
                may not always be able to be fulfilled if we are required to
                retain the information for record keeping purposes, to complete
                transactions, or to comply with our legal obligations);
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
                5.1.5
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                object to or restrict the processing of your personal
                information by us (including for marketing purposes);
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
                5.1.6
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                withdraw your consent at any time where consent is required to
                process your personal information held by us (although this will
                not affect the lawfulness of any processing carried out before
                you withdraw your consent).
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                5.2
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                If you withdraw your consent, you may not be able to access
                MoonTrekker. You will be advised if this is the case at the time
                you withdraw your consent.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                5.3
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                You may opt out of receiving marketing materials from any of our
                partners by contacting the Platform Provider (see clause 7
                below). Please note, however, that even if you opt out from
                receiving marketing materials, you will continue to receive
                notifications or information that is necessary for the use of
                our products or services and MoonTrekker.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                5.4
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                As a security measure, specific information may be required from
                you to help confirm your identity when processing your privacy
                requests or when you exercise your rights.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                5.5
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Any request under clause 7 will normally be addressed free of
                charge. However, a reasonable administration fee may be charged
                if we deem your request at our sole discretion unfounded,
                repetitive, or excessive.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                5.6
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                We will endeavour to respond to all legitimate requests within
                one month. It may take longer than a month if your request is
                particularly complex or if you have made a number of requests.
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                6
              </Text>
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Contact us
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                6.1
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Please contact the Platform Provider in the first instance if
                you have any questions or concerns. If you have unresolved
                concerns, you may have the right to file a complaint with a data
                protection authority in the country where you live or work or
                where you feel your rights have been infringed.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                6.2
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Please contact{' '}
                <Text style={{ color: Colors.primary }}>
                  hello@moontrekker.com
                </Text>{' '}
                or submit any written request to:
              </Text>
            </View>

            <View style={[Gutters.mediumBMargin, Gutters.largeLMargin]}>
              <Text style={[Fonts.body, { color: Colors.white }]}>
                MoonTrekker
              </Text>
              <Text style={[Fonts.body, { color: Colors.white }]}>
                16/F, Shing Lee Commercial Building,
              </Text>
              <Text style={[Fonts.body, { color: Colors.white }]}>
                8 Wing Kut Street, Central, Hong Kong
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                7
              </Text>
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Cookies
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                7.1
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                MoonTrekker uses <Text style={Fonts.bodyBold}>“Cookies” </Text>
                (small sets of information stored as text), and{' '}
                <Text style={Fonts.bodyBold}> “Pixels”</Text> (images used to
                identify web visitors), to provide a more personalised
                experience on MoonTrekker and third party services, to improve
                our products and services, and to measure and analyse usage of
                MoonTrekker.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                7.2
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Cookies help store your account information when you’ve logged
                in to MoonTrekker, and helps personalise your experience.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                7.3
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Analytics and tracking Cookies and Pixels help track how
                MoonTrekker is being used, analyse its performance, and provide
                this analysis to websites where your interactions have been with
                that website.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                7.4
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Cookies and Pixels are also used by MoonTrekker and third party
                advertisers to serve ads based on a user's prior visits to a
                website. These advertising Pixels or Cookies enables us, the
                Platform Provider, third parties, and our partners to serve ads
                to you based on your visit to our website and/or other websites
                on the Internet. We may implement our own third party
                advertising Cookies and Pixels to the same ends.
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                7.5
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Most web browsers will allow you to set some controls over
                Cookies in your brower settings, including disabling Cookies on
                your browser. You can disable Pixels by disabling Javascript on
                your browser. Disabling or refusing Cookies or Pixels may
                significantly inhibit the performance of MoonTrekker or some
                features of MoonTrekker may become inacessible.
              </Text>
            </View>

            <View flexDirection="row">
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                8
              </Text>
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                Changes to this Policy
              </Text>
            </View>
            <View flexDirection="row">
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                8.1
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Gutters.mediumBMargin,
                  { color: Colors.white, flex: 1 },
                ]}
              >
                This Policy may be amended from time to time by posting the
                updated policy on{' '}
                <Text style={Fonts.bodyBold}>MoonTrekker</Text>. It is your
                responsibility to refer to our Policy from time to time to
                familiarise yourself with any changes. By continuing to use{' '}
                <Text style={Fonts.bodyBold}>MoonTrekker</Text> after the
                changes come into effect, you agree to be bound by the revised
                policy.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default IndexPrivacyPolicyContainer;
