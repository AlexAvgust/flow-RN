import { View } from 'react-native'
import React from 'react'
import Svg, { Path, G } from 'react-native-svg'

export default function SvgLogo({ color }: { color: string }) {
    return (
        <View>
            <Svg
                width="900.000000pt"
                height="600.000000pt"
                viewBox="0 0 900.000000 600.000000"
                preserveAspectRatio="xMidYMid meet"
            >
                <G
                    transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)"
                    fill={color}
                    stroke="none"
                >
                    <Path
                        d="M3935 3468 c2 -13 19 -102 35 -198 17 -96 37 -209 45 -250 7 -41 19
-105 25 -142 l12 -68 534 0 534 0 0 340 0 340 -595 0 -595 0 5 -22z m1145
-318 l0 -300 -500 0 c-275 0 -500 4 -500 8 0 7 -13 83 -85 487 -8 44 -15 86
-15 93 0 9 117 12 550 12 l550 0 0 -300z"
                    />
                    <Path
                        d="M4514 3351 c-48 -29 -77 -108 -77 -206 1 -94 21 -153 65 -190 63 -53
125 -15 159 97 25 83 22 149 -11 226 -36 83 -81 107 -136 73z m80 -62 c22 -55
22 -224 0 -279 -13 -32 -21 -40 -38 -38 -38 5 -56 61 -56 175 0 103 9 144 37
175 21 23 39 13 57 -33z"
                    />
                    <Path
                        d="M4140 3150 c0 -161 3 -210 13 -211 6 0 20 -2 30 -4 15 -3 17 8 17
111 0 105 1 114 19 114 10 0 22 7 25 16 9 23 8 24 -19 24 -24 0 -25 3 -25 60
l0 60 41 0 c33 0 40 3 35 16 -3 9 -6 18 -6 20 0 2 -29 4 -65 4 l-65 0 0 -210z"
                    />
                    <Path
                        d="M4300 3151 l0 -209 62 -4 c42 -2 66 1 75 10 23 23 14 32 -32 32 l-45
0 0 190 0 190 -30 0 -30 0 0 -209z"
                    />
                    <Path
                        d="M4680 3348 c1 -49 70 -402 80 -408 28 -17 42 -4 45 41 4 61 27 189
34 189 3 0 14 -50 24 -112 10 -62 20 -115 22 -119 9 -14 54 3 52 20 -2 19 5
65 39 249 29 162 29 154 2 150 -21 -3 -25 -14 -44 -123 -15 -84 -23 -112 -27
-95 -7 27 -37 200 -37 213 0 4 -14 7 -31 7 -24 0 -30 -4 -25 -15 5 -14 -16
-153 -31 -200 -7 -22 -26 57 -38 158 -7 55 -8 57 -36 57 -17 0 -29 -5 -29 -12z"
                    />
                </G>
            </Svg>
        </View>
    )
}
