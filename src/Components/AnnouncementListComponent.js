import React, { useState, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/Theme';
import { navigate } from '@/Navigators/Root';
import PhotoGalleryComponent from '@/Components/PhotoGalleryComponent';

function AnnouncementListComponent({ list }) {
  const { Colors, Gutters, Fonts } = useTheme();

  const [listIndex, setListIndex] = useState(0);

  const [data, setData] = useState(list);

  useEffect(() => {
    if (list) {
      setData(list);
    }
  }, [list]);

  return data.length ? (
    <View
      justifyContent="center"
      style={{
        overflow: 'hidden',
      }}
      marginBottom={14}
      marginTop={5}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigate('Announcement Details', {
            announcementId: data[listIndex].announcement_id,
            screen_view: `Announcement/${data[listIndex].announcement_id}`,
          })
        }
      >
        <View
          style={[
            Gutters.smallHMargin,
            {
              backgroundColor: Colors.white,
              borderRadius: 8,
              width: Dimensions.get('window').width - 30,
            },
          ]}
        >
          <View height={200}>
            <PhotoGalleryComponent
              type="announcement"
              data={data}
              updateDesc={(index) => {
                setListIndex(index);
              }}
            />
          </View>
          <View
            style={[
              Gutters.smallTPadding,
              Gutters.mediumBPadding,
              Gutters.mediumHPadding,
              {
                backgroundColor: Colors.white,
                borderBottomEndRadius: 8,
                borderBottomStartRadius: 8,
              },
            ]}
          >
            <Text
              style={[Fonts.h3, Gutters.tinyBMargin, { color: Colors.primary }]}
            >
              {data[listIndex].title}
            </Text>
            <Text style={[Fonts.body, { color: Colors.bodyText }]}>
              {data[listIndex].description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  ) : null;
}

export default AnnouncementListComponent;
