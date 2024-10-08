import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";

function Environment() {
  if (window.navigator.userAgent.indexOf("iPhone") != -1) return true;
  else if (window.navigator.userAgent.indexOf("iPad") != -1) return true;
  else return false;
}
export default function JRShokoku() {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#3465A4",
          height: hp("100%"),
          width: "100%",
          top: 0,
        }}
      >
        <Image
          source={require("../../assets/Apps/JRSHikoku/JR.png")}
          style={{
            alignItems: "baseline",
            height: "100%",
            width: wp("100%"),
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
        <View style={{ flexDirection: "row", position: "relative" }}>
          <View style={{ flexDirection: "column", flex: 1, height: "100%" }}>
            <View style={{ flex: 1 }} />
            <View>
              <TouchableOpacity
                onPress={() => (location.href = "?page=Apps")}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Entypo name="chevron-thin-left" color={"white"} size={25} />
                {wp("100%") < 580 ? (
                  <Entypo name="grid" color={"white"} size={25} />
                ) : (
                  <Text style={{ fontSize: 20, color: "white" }}>
                    アプリ一覧に戻る
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
                source={require("../../assets/Apps/JRS.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text style={{ fontSize: 20, color: "white", marginLeft: 5 }}>
                JR四国列車運行情報{"\n"}表示アプリ
              </Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ flex: 1, flexDirection: "row-reverse" }} />
        </View>
        <View
          style={{
            flexDirection: "row",
            height: "100%",
            alignContent: "center",
          }}
        >
          <View style={{ alignItems: "center", flex: 2, minWidth: 400 }}>
            <View style={{ flex: 1 }} />
            <Image
              source={require("../../assets/Apps/JRS.png")}
              style={{ height: 150, width: 150 }}
            />
            <Text
              style={{
                fontSize: 30,
                color: "white",
                marginTop: 5,
                fontFamily: "Inter-Black",
              }}
            >
              JR四国列車位置情報アプリ
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                marginTop: 5,
                fontFamily: "Inter-Black",
              }}
            >
              iOS版、Android版共に公開中！！
            </Text>
            <TouchableOpacity
              onPress={() =>
                Environment()
                  ? (location.href =
                      "https://twitter.com/Xprocess_main/status/1209842379919806464?s=20")
                  : (location.href =
                      "https://play.google.com/store/apps/details?id=jrshikokuinfo.xprocess.hrkn")
              }
            >
              <View
                style={{
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "red",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    type="Entypo"
                    name="app-store"
                    style={{ color: "white", fontSize: 60, margin: 15 }}
                  />
                  <Icon
                    type="Entypo"
                    name="google-play"
                    style={{ color: "white", fontSize: 60, margin: 15 }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    marginTop: 5,
                    fontFamily: "Inter-Black",
                  }}
                >
                  ダウンロードはこちら
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </View>
      <View style={{ height: 10 }} />
      <Text
        style={{ textAlign: "center", fontSize: 50, fontFamily: "Inter-Black" }}
      >
        JR四国位置情報アプリの独自改良点
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={wp("100%") > 800 ? { flex: 1 } : { flex: null }} />
        <View style={wp("100%") > 800 ? { flex: 3 } : null}>
          <Image
            source={require("../../assets/Apps/JRSHikoku/JRSS.png")}
            resizeMode="contain"
            style={
              wp("100%") > 800
                ? { height: (((wp("100%") / 5) * 2) / 1237) * 4963 }
                : {
                    height: ((wp("100%") - 60) / 1237) * 4963,
                    width: wp("100%") - 60,
                  }
            }
          />
        </View>
        <View
          style={
            wp("100%") > 800
              ? { flex: 3 }
              : { position: "relative", left: -(wp("100%") - 50) }
          }
        >
          <View
            style={
              wp("100%") > 800
                ? { height: (((wp("100%") / 5) * 2) / 1237) * 4963 }
                : {
                    height: ((wp("100%") - 50) / 1237) * 4963,
                    width: wp("100%"),
                    textAlign: "right",
                    backgroundColor: "rgba(255,255,255,0.4)",
                    paddingRight: 10,
                  }
            }
          >
            <View style={{ flex: 1 }} />
            <Text style={{ fontSize: 30, fontFamily: "Inter-Black" }}>
              上部のPC/スマホ切り替えバナーの消去
            </Text>
            <View style={{ flex: 2 }} />
            <Text style={{ fontSize: 30, fontFamily: "Inter-Black" }}>
              貨物列車の列番も表示。
            </Text>
            <View style={{ flex: 4 }} />
            <Text style={{ fontSize: 30, fontFamily: "Inter-Black" }}>
              臨時列車の列番も表示。
            </Text>
            <View style={{ flex: 4 }} />
            <Text style={{ fontSize: 30, fontFamily: "Inter-Black" }}>
              ワンマン列車(4/5xxx番台)にはワンマン表記
            </Text>
            <View style={{ flex: 4 }} />
            <Text style={{ fontSize: 30, fontFamily: "Inter-Black" }}>
              予讃線の海線、山線経由も付加。
            </Text>
            <View style={{ flex: 4 }} />
          </View>
        </View>
      </View>
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
