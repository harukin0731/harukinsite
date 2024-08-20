import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Card, CardItem, Icon, Left, Thumbnail, Body } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import * as RootNavigation from "../../RootNavigation.js";

const CardsMain = [];
const CardsSub = [];
var carouselItems = [
  {
    title: "JR四国アプリが更にパワーアップ！",
    text: "予讃線内経由表示が可能となりました！！詳細はこちらから！",
    image: require("../../assets/news/JRShikoku.png"),
    URL: "JRShikoku",
  },
];

export default function data({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#89C4D8",
          height: hp("40%"),
          width: "100%",
          top: 0,
        }}
      >
        <View style={{ flexDirection: "row", position: "relative" }}>
          <View style={{ flexDirection: "column", flex: 1, height: "100%" }}>
            <View style={{ flex: 1 }} />
            <View>
              <TouchableOpacity
                onPress={() => (location.href = ".")}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Entypo name="chevron-thin-left" color={"white"} size={25} />
                {wp("100%") < 580 ? (
                  <Entypo name="grid" color={"white"} size={25} />
                ) : (
                  <Text style={{ fontSize: 20, color: "white" }}>
                    トップページに戻る
                  </Text>
                )}
              </TouchableOpacity>
              <View style={{ flex: 1 }}></View>
            </View>
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/Harukin2.png")}
                style={{ height: 50, width: 200 }}
              />
              <Text style={{ fontSize: 30, color: "white" }}> Apps</Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ flex: 1, flexDirection: "row-reverse" }} />
        </View>
        {/* 
                <Carousel
                    layout={"default"}
                    data={carouselItems}
                    sliderWidth={wp("100%")}
                    itemWidth={wp("100%") > 800 ? wp("30%") : wp("80%")}
                    layoutCardOffset={`18`}
                    renderItem={renderItem}
                    autoplay={'true'}
                    loop={true} /> */}
      </View>
      <View style={{ height: 10 }} />
      <Text>
        仮ページです。以下のカードをクリックすることでインストールページへ飛べます。
      </Text>
      <TouchableOpacity
        style={{
          width: wp("100%") > 800 ? wp("99%") / 4 : wp("100%"),
          minWidth: 200,
        }}
        onPress={() =>
          window.navigator.userAgent.indexOf("iPhone") != -1
            ? (location.href =
                "https://apps.apple.com/us/app/ファミマ店員用揚げ物製作支援アプリ/id1488118221")
            : (location.href =
                "https://play.google.com/store/apps/details?id=familymart_toolkit.xprocess.hrkn")
        }
      >
        {wp("100%") > 800 ? (
          <Card>
            <CardItem cardBody>
              <Image
                source={require("../../assets/Apps/fm.png")}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
            <CardItem footer>
              <Text>"ファミマ店員用揚げ物製作支援アプリ"</Text>
            </CardItem>
            <CardItem footer>
              <Text>
                "ファミマでバイトしている人のためのホットスナック製作支援ツールです。ホットスナックを作るタスク管理、時間を簡単に扱うことができます"
              </Text>
            </CardItem>
            <CardItem footer bordered>
              {DetectOSStatus(1, 2)}
            </CardItem>
          </Card>
        ) : (
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require("../../assets/Apps/fm.png")} />
                <Body>
                  <Text>"ファミマ店員用揚げ物製作支援アプリ"</Text>
                  <Text>
                    "ファミマでバイトしている人のためのホットスナック製作支援ツールです。ホットスナックを作るタスク管理、時間を簡単に扱うことができます"
                  </Text>
                  {DetectOSStatus(1, 2)}
                </Body>
              </Left>
            </CardItem>
          </Card>
        )}
      </TouchableOpacity>
    </View>
  );
}

function renderItem({ item }) {
  return (
    <TouchableOpacity onPress={() => RootNavigation.navigate(item.URL)}>
      <Card
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          Height: hp("30%"),
          justifyContent: "flex-start",
          flexDirection: "column-reverse",
        }}
      >
        <CardItem
          cardBody
          style={{
            height: hp("30%"),
            width: "100%",
            top: 0,
            position: "absolute",
          }}
        >
          <Image
            source={item.image}
            style={{
              height: hp("30%"),
              width: "100%",
              top: 0,
              position: "absolute",
            }}
          />
        </CardItem>
        <CardItem footer bordered style={{ marginTop: "auto" }}>
          <Text>{item.text}</Text>
        </CardItem>
        <CardItem cardBody style={{ marginTop: "auto" }}>
          <Text style={{ fontSize: 20, margin: 8 }}>{item.title}</Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}
function DetectOSStatus(AS, iS) {
  var AndroidText;
  var iOSText;
  switch (AS) {
    case 0:
      AndroidText = "未開発";
      break;
    case 1:
      AndroidText = "一般公開中";
      break;
    case 2:
      AndroidText = "βテスト中";
      break;
  }
  switch (iS) {
    case 0:
      iOSText = "未開発";
      break;
    case 1:
      iOSText = "一般公開中";
      break;
    case 2:
      iOSText = "βテスト中";
      break;
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icon type="Entypo" name="google-play" />
      <Text>{AndroidText}</Text>
      <Icon type="Entypo" name="app-store" />
      <Text>{iOSText}</Text>
    </View>
  );
}

//他のページ

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  loremIpsum: {
    fontSize: 24,
  },
});
