import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { navigate } from '@/Navigators/Root';
import { Config } from '@/Config';
import { useTheme } from '@/Theme';
import { useSelector } from 'react-redux';
import { OfflineImage } from '@/Components/react-native-image-offline';
import PagerView from 'react-native-pager-view';

function PhotoGalleryComponent({ data, updateDesc, type }) {
  const { Colors, Gutters, Layout, Images } = useTheme();
  const internetStatus = useSelector((s) => s.internetStatus.item);

  const [listIndex, setListIndex] = useState(0);
  const [imageOffline, setImageOffline] = useState([]);

  const pager = useRef();

  const renderIndicator = () => {
    let indicator = [];
    if (data.length > 1) {
      for (let i = 0; i < data.length; i++) {
        indicator.push(
          <View
            key={i}
            style={[
              Gutters.tinyHMargin,
              {
                borderRadius: 16,
                height: 11,
                width: 11,
                backgroundColor:
                  listIndex === i ? Colors.primary : Colors.white,
                borderColor: Colors.primary,
                borderWidth: 1,
              },
            ]}
          />,
        );
      }
      return indicator;
    } else {
      return null;
    }
  };

  const forward = () => {
    pager.current?.setPage(
      listIndex === data.length - 1 ? data.length - 1 : listIndex + 1,
    );
    setListIndex((x) => (x === data.length - 1 ? data.length - 1 : x + 1));
  };

  const backward = () => {
    pager.current?.setPage(listIndex === 0 ? 0 : listIndex - 1);
    setListIndex((x) => (x === 0 ? 0 : x - 1));
  };

  useEffect(() => {
    if (data.length > 1) {
      updateDesc(listIndex);
    } else {
      updateDesc(0);
    }
  }, [listIndex]);

  return (
    <View
      justifyContent="center"
      style={{
        overflow: 'hidden',
        borderTopLeftRadius: type === 'announcement' ? 8 : 0,
        borderTopRightRadius: type === 'announcement' ? 8 : 0,
      }}
    >
      <PagerView
        ref={pager}
        onPageSelected={({ nativeEvent }) => {
          setListIndex(nativeEvent.position);
        }}
        style={{ height: type === 'announcement' ? 200 : 248 }}
        initialPage={0}
      >
        {data.map((item, i) => (
          <View key={i} style={{ height: 248 }} collapsable={false}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (type !== 'announcement') {
                  navigate('View Image', {
                    uri: `${Config.IMAGE_URL_PREFIX}trail/${item.trail_id}/${item.image_filename}`,
                  });
                } else {
                  navigate('Announcement Details', {
                    announcementId: item.announcement_id,
                    screen_view: `Announcement/${item.announcement_id}`,
                  });
                }
              }}
            >
              {type === 'challenge' || type === 'announcement' ? (
                <Image
                  resizeMode={'cover'}
                  style={[
                    Gutters.largeBPadding,
                    {
                      height: type === 'challenge' ? 248 : 200,
                      width: Dimensions.get('window').width * 0.95,
                    },
                  ]}
                  defaultSource={Images.imagePlaceholder}
                  source={{
                    uri:
                      type === 'challenge'
                        ? `${Config.IMAGE_URL_PREFIX}trail/${item.trail_id}/${item.image_filename}`
                        : `${Config.IMAGE_URL_PREFIX}announcement/${item.announcement_id}/${item.cover_image}`,
                  }}
                />
              ) : (
                <>
                  <View
                    style={{
                      display: 'none',
                    }}
                  >
                    <OfflineImage
                      key={`${Config.IMAGE_URL_PREFIX}trail/${item.trail_id}/${item.image_filename}`}
                      reloadImage={true}
                      source={{
                        uri: `${Config.IMAGE_URL_PREFIX}trail/${item.trail_id}/${item.image_filename}`,
                      }}
                      getImage={(uri) => {
                        if (uri) {
                          setImageOffline((prev) => [
                            ...prev,
                            { name: item.image_filename, uri },
                          ]);
                        }
                      }}
                    />
                  </View>
                  <Image
                    source={
                      internetStatus.isOnline
                        ? {
                            uri: `${Config.IMAGE_URL_PREFIX}trail/${item.trail_id}/${item.image_filename}`,
                          }
                        : imageOffline.find(
                            (image) => image.name === item.image_filename,
                          )
                        ? {
                            uri:
                              'file://' +
                              imageOffline.find(
                                (image) => image.name === item.image_filename,
                              ).uri,
                          }
                        : Images.imagePlaceholder
                    }
                    defaultSource={Images.imagePlaceholder}
                    style={[
                      Gutters.largeBPadding,
                      {
                        height: 248,
                        width: Dimensions.get('window').width * 0.95,
                        resizeMode: 'cover',
                      },
                    ]}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </PagerView>
      {listIndex !== 0 && (
        <View position="absolute" height="100%" flexDirection="row" left={0}>
          <TouchableOpacity
            onPress={backward}
            activeOpacity={0.8}
            style={Layout.justifyContentCenter}
          >
            <Image
              style={[Gutters.smallHMargin, { height: 35, width: 25 }]}
              source={Images.leftArrowBordered}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
      )}
      {listIndex !== data.length - 1 && (
        <View position="absolute" height="100%" flexDirection="row" right={0}>
          <TouchableOpacity
            onPress={forward}
            activeOpacity={0.8}
            style={Layout.justifyContentCenter}
          >
            <Image
              style={[Gutters.smallHMargin, { height: 35, width: 25 }]}
              source={Images.rightArrowBordered}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
      )}
      <View
        position="absolute"
        width="100%"
        flexDirection="row"
        bottom={15}
        justifyContent="center"
      >
        {renderIndicator()}
      </View>
    </View>
  );
}

export default PhotoGalleryComponent;
