import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  Clipboard,
  UIManager,
} from "react-native";
import { Card, CardItem, Thumbnail, Left, Body } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import LottieView from "react-native-web-lottie";
//import Clipboard from '@react-native-community/clipboard';
import xmlToJSON from "xmltojson";
import { csvText_to_json } from "./util/csvText_to_json";
import { RenderItem } from "./util/carouselTools";
import * as appJson from "./app.json";
import * as packageJson from "./package.json";
//メインコンポーネント
//****************** */
export function TopPage({ navigation }) {
  const [NotiCard, setNotiCard] = useState(null);
  const [NotiCard2, setNotiCard2] = useState(null);
  const [topCarousel, setCarousel] = useState(null);
  const [banner, setBanner] = useState([]);
  const [blogTab, setBlogTab] = useState("harukin");
  UIManager.setLayoutAnimationEnabledExperimental(true);
  useEffect(() => {
    fetch("https://storage.haruk.in/webpage-resource/banner/banner.csv", {
      mode: "cors",
    })
      .then((response) => response.text())
      .then((text) => csvText_to_json(text))
      .then((data) => setBanner(data.filter((d) => d.type != "website")));

    fetch("https://blog.haruk.in/rss.xml", { mode: "cors" })
      .then((response) => response.text())
      .then((text) => xmlToJSON.parseString(text))
      .then((results) => {
        console.log("取得完了");
        console.log(results);
        const NotiDataItems = results.rss[0].channel[0].item.map((D) => ({
          title: D.title[0]._text,
          text: D.encoded[0]._text,
          image: require("./assets/HarukinLogo/HarukinPlus_s.png"),
          URL: D.link[0]._text,
          time: D.pubDate[0]._text,
        }));
        setNotiCard(
          NotiDataItems.map((Noti) => (
            <CardItem
              bordered
              button
              onPress={() => (location.href = Noti.URL)}
            >
              <Left>
                <Thumbnail source={Noti.image} />
                <Body style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>{Noti.title}</Text>
                    <View style={{ flex: 1 }} />
                  </View>
                  <Text style={{ fontStyle: "italic" }}>
                    {Noti.text.slice(0, 40)}...
                  </Text>
                </Body>
              </Left>
            </CardItem>
          ))
        );
      });
    fetch("https://xprocess.haruk.in/feed.json", { mode: "cors" })
      .then((response) => response.json())
      .then((results) => {
        console.log("取得完了");
        console.log(results);
        const NotiDataItems = results.items.map((D) => ({
          title: D.title,
          text: D.content_html,
          image: "https://xprocess.haruk.in/favicon.jpg",
          URL: D.url,
          time: D.date_published,
        }));
        setNotiCard2(
          NotiDataItems.map((Noti) => (
            <CardItem
              bordered
              button
              onPress={() => (location.href = Noti.URL)}
            >
              <Left>
                <Thumbnail source={Noti.image} />
                <Body style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>{Noti.title}</Text>
                    <View style={{ flex: 1 }} />
                  </View>
                  <Text style={{ fontStyle: "italic" }}>
                    {Noti.text.slice(0, 40)}...
                  </Text>
                </Body>
              </Left>
            </CardItem>
          ))
        );
      })
      .catch((e) => {
        console.log("hogeho");
      });
    fetch("https://storage.haruk.in/webpage-resource/top-carousel/list.csv", {
      mode: "cors",
    })
      .then((response) => response.text())
      .then((text) => csvText_to_json(text))
      .then((data) => setCarousel(data));
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          height:
            wp("100%") > 800 ? hp("30%") + 100 : (wp("80%") / 16) * 9 + 100,
          minHeight: 250,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#46385b",
        }}
      >
        <View
          style={{ flexDirection: "row", height: 70, width: wp("100%") - 20 }}
        >
          <View style={{ flexDirection: "column" }}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => navigation.navigate("Status")}>
              <Entypo
                name="bar-graph"
                color={"white"}
                size={25}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }} />
            <Image
              source={require("./assets/HarukinLogo/Harukin_w.svg")}
              style={{ height: 50, width: 200 }}
            />
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => navigation.navigate("About")}>
              <Entypo
                name="info-with-circle"
                color={"white"}
                size={25}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </View>
        </View>
        {topCarousel ? (
          <Carousel
            layout={"default"}
            data={topCarousel}
            width={wp("100%")}
            sliderWidth={wp("100%")}
            itemWidth={wp("100%") > 800 ? (hp("30%") / 9) * 16 : wp("80%")}
            layoutCardOffset={`18`}
            renderItem={RenderItem}
            autoplay={"true"}
            loop={true}
          />
        ) : (
          <View
            style={{
              backgroundColor: "white",
              height: wp("100%") > 800 ? hp("30%") : (wp("80%") / 16) * 9,
              width: wp("100%") < 800 ? wp("80%") : (hp("30%") / 9) * 16,
              marginBottom: 25,
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <View style={{ flex: 1 }} />
            <LottieView
              autoPlay
              loop
              style={{ width: 150, height: 150, backgroundColor: "white" }}
              source={require("./assets/51690-loading-diamonds.json")}
            />
            <View style={{ flex: 1 }} />
          </View>
        )}
      </View>
      <View>
        <View style={{ height: 10 }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>やってること</Text>
          <View style={{ flexDirection: "row" }}>
            <div
              style={{
                width: wp("99%") / 3 - 10,
                margin: 0,
                padding: 0,
                borderStyle: "solid",
                borderColor: "dark",
                borderWidth: 1,
                alignItems: "center",
              }}
              onClick={() => (location.href = "?page=web")}
            >
              <View
                style={{
                  borderStyle: "solid",
                  borderColor: "blue",
                  borderWidth: 0,
                  alignItems: "center",
                }}
              >
                <Entypo
                  name="globe"
                  color={"black"}
                  size={25}
                  style={{ margin: 10 }}
                />
                <Text>オンラインアプリ</Text>
              </View>
            </div>
            <div
              style={{
                width: wp("99%") / 3 - 10,
                margin: 0,
                padding: 0,
                borderStyle: "solid",
                borderColor: "dark",
                borderWidth: 1,
                alignItems: "center",
              }}
              onClick={() => (location.href = "?page=Apps")}
            >
              <View
                style={{
                  borderStyle: "solid",
                  borderColor: "blue",
                  borderWidth: 0,
                  alignItems: "center",
                }}
              >
                <Entypo
                  name="globe"
                  color={"black"}
                  size={25}
                  style={{ margin: 10 }}
                />
                <Text>ネイティブアプリ</Text>
              </View>
            </div>
            <div
              style={{
                width: wp("99%") / 3 - 10,
                margin: 0,
                padding: 0,
                borderStyle: "solid",
                borderColor: "dark",
                borderWidth: 1,
                alignItems: "center",
              }}
              onClick={() => (location.href = "http://blog.haruk.in")}
            >
              <View
                style={{
                  borderStyle: "solid",
                  borderColor: "blue",
                  borderWidth: 0,
                  alignItems: "center",
                }}
              >
                <Entypo
                  name="globe"
                  color={"black"}
                  size={25}
                  style={{ margin: 10 }}
                />
                <Text>ブログ</Text>
              </View>
            </div>
          </View>
        </View>
        <View
          style={{
            flexDirection: wp("100%") > 800 ? "row" : "column",
            width: "100%",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flex: wp("100%") > 800 ? 2 : null,
              width: "100%",
              padding: wp("100%") > 800 ? 20 : 5,
              paddingRight: wp("100%") > 800 ? 10 : null,
            }}
          >
            <Card style={{ width: "100%" }} button>
              <CardItem
                onPress={() => (location.href = "https://pcgf.io")}
                cardBody
                button
                style={{ margin: 10, flexDirection: "column" }}
              >
                <Image
                  source={require("./assets/PCGF.jpg")}
                  style={{ height: 200, width: "100%" }}
                />
                <Text>
                  PCGFは学生時代のお金無しが集まったガジェット集団です。現在はOSSを活用したソーシャルサービスの建築や広報活動、ガジェット情報の連絡、MNGなどをしております。
                </Text>
                <View style={{ margin: 2 }} />
                <Text>
                  主な活動場所はMattermostやMastodonで活発な情報共有、オフラインではオープンソースカンファレンスでブースを展開しております。
                </Text>
              </CardItem>
            </Card>
            <View
              style={{
                alignItems: "center",
                flex: wp("100%") > 800 ? 1 : null,
                width: "100%",
              }}
            >
              <Card style={{ width: "100%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    paddingBottom: 0,
                    borderBottomColor: "dark",
                    borderBottomWidth: 1,
                  }}
                >
                  {wp("100%") > 400 ? (
                    <Text style={{ fontWeight: "bold", padding: 10 }}>
                      ブログの更新...
                    </Text>
                  ) : (
                    <Entypo name="feather" size={20} style={{ margin: 10 }} />
                  )}

                  <View style={{ flex: 1 }} />
                  <Text
                    style={{
                      fontWeight: "bold",
                      padding: 10,
                      borderBottomColor: "#46385b",
                      borderBottomWidth: blogTab == "harukin" ? 3 : 0,
                    }}
                    onClick={() => setBlogTab("harukin")}
                  >
                    はるきんぶろぐ
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      padding: 10,
                      borderBottomColor: "#46385b",
                      borderBottomWidth: blogTab == "PCGF" ? 3 : 0,
                      color: NotiCard2 || "gray",
                    }}
                    onClick={() => NotiCard2 && setBlogTab("PCGF")}
                  >
                    Xprocess-Info
                  </Text>
                </View>
                {blogTab == "harukin" ? (
                  NotiCard ? (
                    NotiCard
                  ) : (
                    <CardItem
                      bordered
                      button
                      onPress={() => (location.href = Noti.URL)}
                    >
                      <Body style={{ alignItems: "center" }}>
                        <LottieView
                          autoPlay
                          loop
                          style={{
                            width: 150,
                            height: 150,
                            backgroundColor: "white",
                          }}
                          source={require("./assets/51690-loading-diamonds.json")}
                        />
                      </Body>
                    </CardItem>
                  )
                ) : NotiCard2 ? (
                  NotiCard2
                ) : (
                  <CardItem
                    bordered
                    button
                    onPress={() => (location.href = Noti.URL)}
                  >
                    <Body style={{ alignItems: "center" }}>
                      <LottieView
                        autoPlay
                        loop
                        style={{
                          width: 150,
                          height: 150,
                          backgroundColor: "white",
                        }}
                        source={require("./assets/51690-loading-diamonds.json")}
                      />
                    </Body>
                  </CardItem>
                )}
              </Card>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              flex: wp("100%") > 800 ? 1 : null,
              width: "100%",
              padding: wp("100%") > 800 ? 20 : 5,
              paddingLeft: wp("100%") > 800 ? 10 : null,
            }}
          >
            <Card style={{ width: "100%" }}>
              <CardItem header bordered>
                <Text style={{ fontWeight: "bold" }}>ミニアプリ</Text>
              </CardItem>
              {banner.map((data) => (
                <CardItem
                  button
                  cardBody
                  onPress={() =>
                    data.type == "website"
                      ? (location.href = data.url)
                      : navigation.navigate("MiniApps", { data: data })
                  }
                  style={{ flexDirection: "column" }}
                >
                  <Image
                    source={
                      data.image ||
                      "https://nexcloud.haruk.in/s/8H8FfZNHsKFoWDn/preview"
                    }
                    style={{ height: 200, width: "100%", flex: 1 }}
                  />
                  <Text style={{ fontSize: 20 }}>{data.name}</Text>
                </CardItem>
              ))}
            </Card>
          </View>
        </View>
      </View>
    </View>
  );
}
//メインコンポーネント
//****************** */

//他のページ
export function TopPageAbout({ navigation }) {
  const [downloadList, setDownloadList] = useState();
  useEffect(() => {
    fetch("https://storage.haruk.in/webpage-resource/AccountSheetList.csv", {
      mode: "cors",
    })
      .then((response) => response.text())
      .then((text) => csvText_to_json(text))
      .then((json) =>
        Promise.all(
          json.map((data) =>
            fetch(data.url, { mode: "cors" })
              .then((response) => response.text())
              .then((text) => ({
                titleData: data,
                bodyData: csvText_to_json(text),
              }))
          )
        )
      )
      .then((json) => setDownloadList(json));
  }, []);
  console.log(packageJson.default);
  return (
    <View
      style={{ alignItems: "center", position: "relative", height: "auto" }}
    >
      <Image
        source={require("./assets/HarukinLogo/Harukin.svg")}
        style={{ height: 50, width: 200 }}
      />
      <Text>
        これはReactNativeとExpo、それにReactnavigationを利用して作成されています。
      </Text>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20 }}>
          SiteVersion:{appJson.default.expo.version} ExpoVersion:
          {packageJson.default.dependencies.expo}
        </Text>
        <Text style={{ fontSize: 20 }}>
          GitHub Repository:{" "}
          <a href="https://github.com/harukin0731/harukinsite">here!</a>
        </Text>
      </View>
      <View
        style={{
          display: "grid",
          gridTemplateColumns:
            downloadList == undefined
              ? "1fr"
              : wp("100%") > 1000
              ? "1fr 1fr 1fr"
              : wp("100%") > 800
              ? "1fr 1fr"
              : "1fr",
          margin: 15,
        }}
      >
        {downloadList ? (
          downloadList.map((data) => (
            <Card
              style={{
                width:
                  wp("100%") > 1000
                    ? wp("30%")
                    : wp("100%") > 800
                    ? wp("40%")
                    : wp("90%"),
                maxWidth: 600,
              }}
            >
              <CardItem bordered>
                <Body style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Entypo
                      name={data.titleData.icon}
                      color={"#1DA1F2"}
                      style={{ margin: 5, fontSize: 30 }}
                    />
                    <Text
                      style={{ fontWeight: "bold", margin: 5, fontSize: 30 }}
                    >
                      {data.titleData.name}
                    </Text>
                  </View>
                  <Text style={{ fontStyle: "italic", fontSize: 20 }}>
                    {data.titleData.description}
                  </Text>
                </Body>
              </CardItem>
              {(() => {
                const typeList = [...new Set(data.bodyData.map((d) => d.type))];
                return typeList.map((tl) => {
                  const returnDatabase = data.bodyData.filter((d) =>
                    d.type == tl ? true : false
                  );
                  return [
                    <CardItem bordered>
                      <View style={{ flexDirection: "row" }}>
                        <Entypo
                          name={returnDatabase[0].icon}
                          color={"#1DA1F2"}
                          style={{ margin: 5, fontSize: 20 }}
                        />
                        <Text
                          style={{
                            fontWeight: "bold",
                            margin: 5,
                            fontSize: 20,
                          }}
                        >
                          {tl}
                        </Text>
                      </View>
                    </CardItem>,
                    returnDatabase.map((d) => (
                      <CardItem
                        bordered
                        button
                        onPress={() =>
                          d.url
                            ? (location.href = d.url)
                            : Clipboard.setString(d.copy)
                        }
                      >
                        <Left>
                          <Thumbnail source={d.image} />
                          <Body style={{ flexDirection: "column" }}>
                            <View style={{ flexDirection: "row" }}>
                              <Text style={{ fontWeight: "bold" }}>
                                {d.name}
                              </Text>
                              <View style={{ flex: 1 }} />
                            </View>
                            <Text style={{ fontStyle: "italic" }}>
                              {d.description}
                            </Text>
                            {d.url ? null : (
                              <Text style={{ fontStyle: "italic" }}>
                                クリックしてコピーします
                              </Text>
                            )}
                          </Body>
                        </Left>
                      </CardItem>
                    )),
                  ];
                });
              })()}
            </Card>
          ))
        ) : (
          <Card style={{ width: wp("100%") > 800 ? wp("40%") : wp("90%") }}>
            <CardItem>
              <Body style={{ flexDirection: "column", alignItems: "center" }}>
                <LottieView
                  autoPlay
                  loop
                  style={{ width: 200, height: 200 }}
                  source={require("./assets/51690-loading-diamonds.json")}
                />
                <Text>読み込み中........!!!</Text>
              </Body>
            </CardItem>
          </Card>
        )}
      </View>
    </View>
  );
}

export function TopPageStatus({ navigation }) {
  const [tab, setTab] = useState("harukin");
  const [harukin, setHarukin] = useState(true);
  const [pcgf, setPCGF] = useState(true);
  const [rintan, setRintan] = useState(true);
  const [count, setCount] = useState(0);
  return (
    <View
      style={{ alignItems: "center", position: "relative", height: "100%" }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 5,
          paddingBottom: 0,
          borderBottomColor: "dark",
          borderBottomWidth: 1,
          width: "100%",
        }}
      >
        <Text
          style={{
            flex: 1,
            fontWeight: "bold",
            textAlign: "center",
            padding: 10,
            borderBottomColor: "#46385b",
            borderBottomWidth: tab == "harukin" ? 3 : 0,
          }}
          onClick={() => setTab("harukin")}
        >
          haruk.in
          {harukin && (
            <LottieView
              autoPlay
              loop
              style={{
                width: 25,
                height: 25,
                backgroundColor: "#00000000",
                position: "absolute",
                top: 10,
              }}
              source={require("./assets/51690-loading-diamonds.json")}
            />
          )}
        </Text>
        <Text
          style={{
            flex: 1,
            fontWeight: "bold",
            textAlign: "center",
            padding: 10,
            borderBottomColor: "#46385b",
            borderBottomWidth: tab == "PCGF" ? 3 : 0,
          }}
          onClick={() => setTab("PCGF")}
        >
          PCGF.io
          {pcgf && (
            <LottieView
              autoPlay
              loop
              style={{
                width: 25,
                height: 25,
                backgroundColor: "#00000000",
                position: "absolute",
                top: 10,
              }}
              source={require("./assets/51690-loading-diamonds.json")}
            />
          )}
        </Text>
        <Text
          style={{
            flex: 1,
            fontWeight: "bold",
            textAlign: "center",
            padding: 10,
            borderBottomColor: count > 10 ? "#00FF18" : "#46385b",
            borderBottomWidth: tab == "rintan" ? 3 : 0,
          }}
          onClick={() => {
            setTab("rintan");
            setCount(count + 1);
            count > 10 && window.localStorage.setItem("rintarnet", "user");
          }}
        >
          rintan.net
          {rintan && (
            <LottieView
              autoPlay
              loop
              style={{
                width: 25,
                height: 25,
                backgroundColor: "#00000000",
                position: "absolute",
                top: 10,
              }}
              source={require("./assets/51690-loading-diamonds.json")}
            />
          )}
        </Text>
      </View>
      <iframe
        src="https://status.haruk.in/"
        title="iframe Example 1"
        width="100%"
        height="100%"
        style={{ display: tab != "harukin" && "none" }}
        onLoad={() => {
          LayoutAnimation.easeInEaseOut();
          setHarukin(false);
          console.log("読み込み完了");
        }}
      ></iframe>
      <iframe
        src="https://status.pcgf.io/"
        title="iframe Example 1"
        width="100%"
        height="100%"
        style={{ display: tab != "PCGF" && "none" }}
        onLoad={() => {
          LayoutAnimation.easeInEaseOut();
          setPCGF(false);
          console.log("読み込み完了");
        }}
      ></iframe>
      <iframe
        src="https://status.rintar.net/"
        title="iframe Example 1"
        width="100%"
        height="100%"
        style={{ display: tab != "rintan" && "none" }}
        onLoad={() => {
          LayoutAnimation.easeInEaseOut();
          setRintan(false);
          console.log("読み込み完了");
        }}
      ></iframe>
    </View>
  );
}

export function MiniApps(props) {
  const { navigation, route } = props;
  const { data } = route.params;
  const { url: address, image, name, description } = data;
  const [loadFrame, setLoadFrame] = useState(undefined);
  addEventListener(
    "message",
    function (event) {
      if (event.origin !== address) {
        return;
      }
      if (event.data == "doCloseAction") {
        navigation.navigate("トップページ");
      }
    },
    false
  );
  return (
    <View
      style={{
        alignItems: "center",
        position: "relative",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <iframe
        src={address}
        title="iframe Example 1"
        width="100%"
        height="100%"
        style={{ display: loadFrame || "none" }}
        onLoad={() => {
          LayoutAnimation.easeInEaseOut();
          setLoadFrame(true);
          console.log("読み込み完了");
        }}
      ></iframe>
      <View
        style={{
          alignItems: "center",
          position: "relative",
          height: "100%",
          width: "100%",
          display: loadFrame && "none",
        }}
      >
        <View style={{ flex: 1 }} />
        <Image
          style={{ width: "100%", height: 200 }}
          source={{
            uri: image || "https://nexcloud.haruk.in/s/8H8FfZNHsKFoWDn/preview",
          }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 30 }}>{name}</Text>
        <Text>{description}</Text>
        <LottieView
          autoPlay
          loop
          style={{
            width: 300,
            height: 200,
            backgroundColor: "#00000000",
          }}
          source={require("./assets/121962-line-loading.json")}
        />
        <View style={{ flex: 1 }} />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("トップページ")}
        style={{ position: "absolute", top: 0, left: 0, padding: 10 }}
      >
        <Entypo
          name="circle-with-cross"
          color={"white"}
          size={"1.5rem"}
          style={{ margin: "0.5rem" }}
        />
      </TouchableOpacity>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    overflowY: "hidden",
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
